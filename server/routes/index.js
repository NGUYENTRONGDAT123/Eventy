var express = require("express");
var router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv").config();
const redis = require("redis");
const { promisify } = require("util");

//API keys
const eventKey = process.env.GEEKSEAT_API_KEY;
const newsKey = process.env.NEWS_API_KEY;

//  create redis client and connect to redis server
const redis_url = process.env.REDIS_URL || "redis://127.0.0.1";
const redis_client = redis.createClient(redis_url);
const redis_get = promisify(redis_client.get).bind(redis_client);
redis_client.flushdb(function (err, succeeded) {
  if (succeeded === "OK") console.log("Redis cache is clear");
  else console.log("Fail to clear Redis cache");
});

/* GET ALL EVENTs info */
router.get("/events", async function (req, res, next) {
  try {
    const eventsData = await axios.get(
      `https://api.seatgeek.com/2/events?client_id=${eventKey}&per_page=30&listing_count.gt=0`
    );
    return res.status(200).json(eventsData.data);
  } catch (err) {
    res.status(404).json({ error: "Bad Request!" });
  }
});

/* GET 1 event info and its weather. */
router.get("/event/:eventID", async function (req, res, next) {
  const eventID = req.params.eventID;
  const redisKey = `/events/${eventID}`;

  //using redis
  redis_get(redisKey)
    .then(async (result) => {
      //getting result from cache
      if (result) {
        const resultJSON = JSON.parse(result);
        return res.status(200).json(resultJSON);
      }
      // else getting result from third party api
      else {
        //getting event data
        const eventData = await axios.get(
          `https://api.seatgeek.com/2/events/${eventID}?client_id=${eventKey}`
        );
        //using events' location to get the locations' weather
        const location = eventData.data.venue.location;
        const weatherData = await axios.get(
          `https://api.weatherbit.io/v2.0/current?lat=${location.lat}&lon=${location.lon}&key=434a18e3171d47d4995b18e2ba047999`
        );

        // using the venue name to get the news regrading to it
        let headline = eventData.data.venue.name;

        const newsData = await axios.get(
          `https://newsapi.org/v2/everything?q=${headline}&apiKey=${newsKey}&pageSize=5&language=en&sortBy=relevancy`
        );

        // store data in cache
        redis_client.setex(
          redisKey,
          3600,
          JSON.stringify({
            source: "Redis Cache",
            event: eventData.data,
            weather: weatherData.data,
            news: newsData.data,
          })
        );
        // successful returning data
        return res.status(200).json({
          source: "Third API",
          event: eventData.data,
          weather: weatherData.data,
          news: newsData.data,
        });
      }
    })

    //errors
    .catch((err) => {
      res.status(404).json({ error: "Bad Request!" });
    });
});

module.exports = router;
