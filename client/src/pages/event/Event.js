import React from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FetchEvent } from "../../api/api";

import "./Event.css";
import Weather from "../../components/weather/Weather";
import Performers from "../../components/performers/Performers";
import Venue from "../../components/venue/Venue";
import Tickets from "../../components/tickets/Tickets";
import News from "../../components/news/News";

export default function EventPage() {
  const { id } = useParams();

  const { repo, isLoading } = FetchEvent(id);

  if (isLoading) {
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
  } else {
    return (
      <Container>
        <h1>{repo.event.title}</h1>

        <h2> Venue Information </h2>
        <h2>{repo.short_title}</h2>
        <Venue venueData={repo.event} />

        <h2>Performers Info</h2>
        <Performers performersData={repo.event.performers} />
        <h2>Tickets Info </h2>
        <Tickets ticketsData={repo.event.stats} url={repo.event.url} />
        <h2>Weather</h2>
        <Weather
          data={repo.weather.data[0]}
          address={repo.event.venue.address}
        />
        <h2>News About The Venue or Performers</h2>
        <News newsData={repo.news.articles} />
      </Container>
    );
  }
}
