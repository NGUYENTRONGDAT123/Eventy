var express = require("express");
var router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv").config();

const eventKey = process.env.GEEKSEAT_API_KEY;
const newsKey = process.env.NEWS_API_KEY;

/* GET ALL EVENTs info */
router.get("/events", async function (req, res, next) {
  try {
    const eventsData = await axios.get(
      `https://api.seatgeek.com/2/events?client_id=${eventKey}&per_page=30&listing_count.gt=0`
    );
    return res.status(200).json(eventsData.data);
  } catch (err) {
    next(err);
  }
});

/* GET 1 event info and its weather. */
router.get("/event/:eventID", async function (req, res, next) {
  const eventID = req.params.eventID;
  try {
    const eventData = await axios.get(
      `https://api.seatgeek.com/2/events/${eventID}?client_id=${eventKey}`
    );
    const location = eventData.data.venue.location;
    const weatherData = await axios.get(
      `https://api.weatherbit.io/v2.0/current?lat=${location.lat}&lon=${location.lon}&key=434a18e3171d47d4995b18e2ba047999`
    );
    let headline = eventData.data.venue.name;

    const newsData = await axios.get(
      `https://newsapi.org/v2/everything?q=${headline}&apiKey=${newsKey}&pageSize=5&language=en&sortBy=relevancy`
    );
    return res.status(200).json({
      event: eventData.data,
      weather: weatherData.data,
      news: newsData.data,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
