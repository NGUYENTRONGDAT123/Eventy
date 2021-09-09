import React from "react";
import { useHistory } from "react-router-dom";
import { FetchAllEvents } from "../../api/api";
import { Panel, PanelGroup } from "rsuite";
import { Container, Row, Col } from "react-bootstrap";
import "./Events.css";

export default function EventsPage() {
  const data = FetchAllEvents();

  const history = useHistory();

  return (
    <Container>
      <PanelGroup>
        {data.map((e) => {
          return (
            <Panel
              shaded
              bordered
              bodyFill
              onClick={() => history.push(`/events/${e.id}`)}
              className="rs-panel-hoverable"
            >
              <h2>{e.short_title}</h2>
              <Row>
                <Col xs={6} md={4}>
                  <img src={e.performers[0].image} alt="" height="240" />
                </Col>
                <Col xs={6} md={8}>
                  <p>Time: {e.datetime_local}</p>
                  <p>Venue: {e.venue.name}</p>
                  <p>Type: {e.type}</p>
                  <p>Address: {e.venue.address}</p>
                  <p>City: {e.venue.city}</p>
                  <p>Average Ticket Price: ${e.stats.average_price}</p>
                </Col>
              </Row>
            </Panel>
          );
        })}
      </PanelGroup>
    </Container>
  );
}
