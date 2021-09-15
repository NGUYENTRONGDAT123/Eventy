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
router.get("/eventsAPI", async function (req, res, next) {
  const query = req.query.q;
  const page = req.query.page;
  try {
    const eventsData = await axios.get(
      `https://api.seatgeek.com/2/events?client_id=${eventKey}&per_page=10&listing_count.gt=0&q=${query}&page=${page}`
    );
    return res.status(200).json(eventsData.data);
  } catch (err) {
    // next(err);
    res.status(404).json({ error: "Bad Request!" });
  }
});

/* GET 1 event info and its weather. */
router.get("/eventAPI/:eventID", async function (req, res, next) {
  const eventID = req.params.eventID;

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
    let headline = eventData.data.performers[0].name;

    const newsData = await axios.get(
      `https://newsapi.org/v2/everything?qInTitle=${headline}&apiKey=${newsKey}&pageSize=5&language=en`
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
