import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Weather.css";

export default function Weather(props) {
  //weathers' data and address of the venue
  const { data, address } = props;

  //displaying the weather
  return (
    <Container className="weather-info">
      <Row>
        <Col xs={6} md={4}>
          <Row xs={1}>
            <Col className="weather-icon-parent">
              <img
                className="weather-icon"
                alt="Weather Icon"
                src={`https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png`}
              />
            </Col>
            <Col>
              <h2 class="description">{`${data.weather.description}`}</h2>
            </Col>
          </Row>
        </Col>
        <Col xs={6} md={4}>
          <h3>Temperature: {data.temp} °C</h3>
          <h5>Wind Speed: {data.wind_spd} m/s</h5>
          <h5>Wind Direction: {data.wind_cdir_full}</h5>
          <h5>Humidity: {data.rh}%</h5>
          <h5>Clouds Coverage: {data.clouds}%</h5>
          <h5>UV Index: {data.uv}</h5>
          <h5>Air Quality Index: {data.aqi}</h5>
        </Col>
        <Col xs={6} md={4} className="additional-info">
          <h3 className="address">{address}</h3>
          <h5>City: {data.city_name}</h5>
          <h5 className="additional-padding">Country: {data.country_code}</h5>
          <h3>Timezone: {data.timezone.replaceAll("_", " ")}</h3>
          <h5>Data last fetched on: {data.ob_time}</h5>
          <h5>Sunrise at {data.sunrise}</h5>
          <h5>Sunset at {data.sunset}</h5>
        </Col>
      </Row>
    </Container>
  );
}
