var express = require("express");
var router = express.Router();
const axios = require("axios");
var path = require("path");
const dotenv = require("dotenv").config({ path: path.join(__dirname, ".env") });

//API keys
const eventKey = process.env.GEEKSEAT_API_KEY;
const newsKey = process.env.NEWS_API_KEY;
const weatherKey = process.env.WEATHER_API_KEY;

/* GET ALL EVENTs info */
router.get("/events", async function (req, res, next) {
  try {
    const eventsData = await axios.get(
      `https://api.seatgeek.com/2/events?client_id=${eventKey}&per_page=30&listing_count.gt=0`
    );
    return res.status(200).json(eventsData.data);
  } catch (err) {
    next(err);
    // res.status(404).json({ error: "Bad Request!" });
  }
});

/* GET 1 event info and its weather. */
router.get("/event/:eventID", async function (req, res, next) {
  const eventID = req.params.eventID;
  const redisKey = `/events/${eventID}`;

  try {
    //getting event data
    const eventData = await axios.get(
      `https://api.seatgeek.com/2/events/${eventID}?client_id=${eventKey}`
    );
    //using events' location to get the locations' weather
    const location = eventData.data.venue.location;
    const weatherData = await axios.get(
      `https://api.weatherbit.io/v2.0/current?lat=${location.lat}&lon=${location.lon}&key=${weatherKey}`
    );

    // using the venue name to get the news regrading to it
    let headline = eventData.data.venue.name;

    const newsData = await axios.get(
      `https://newsapi.org/v2/everything?q=${headline}&apiKey=${newsKey}&pageSize=5&language=en&sortBy=relevancy`
    );
    // successful returning data
    return res.status(200).json({
      source: "Third API",
      event: eventData.data,
      weather: weatherData.data,
      news: newsData.data,
    });
  } catch (err) {
    //errors
    return res.status(404).json({ error: "Bad Request!" });
  }
});

module.exports = router;
