import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { FetchEvent } from "../../api/api";

import "./Event.css";
import Weather from "../../components/weather/Weather";
import Performers from "../../components/performers/Performers";
import Venue from "../../components/venue/Venue";
import Tickets from "../../components/tickets/Tickets";
import News from "../../components/news/News";

// One event Page
export default function EventPage() {
  const { id } = useParams();

  //fetching data
  const { repo, isLoading, error } = FetchEvent(id);

  // if loading

  if (error.status === true) {
    return (
      <Container>
        <h1>Uh Oh! Something is wrong in the server</h1>
        <h2>{error.message}</h2>
      </Container>
    );
  } else if (isLoading === true && error.status === false) {
    return (
      <div class="parent-loader">
        <div class="loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }
  //loading complete
  else if (isLoading === false && error.status === false) {
    return (
      <Container>
        {/* Title */}
        <h1>{repo.event.title}</h1>

        {/* Venue */}
        <h2> Venue Information </h2>
        <h2>{repo.short_title}</h2>
        <Venue venueData={repo.event} />

        {/* Performers */}
        <h2>Performers Info</h2>
        <Performers performersData={repo.event.performers} />

        {/* Tickets */}
        <h2>Tickets Info </h2>
        <Tickets ticketsData={repo.event.stats} url={repo.event.url} />

        {/* Weather */}
        <h2>Weather</h2>
        <Weather
          data={repo.weather.data[0]}
          address={repo.event.venue.address}
        />

        {/* News */}
        <h2>News About The Venue or Performers</h2>
        <News newsData={repo.news.articles} />
      </Container>
    );
  }
}
