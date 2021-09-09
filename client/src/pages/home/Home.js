import React from "react";
import { Container } from "react-bootstrap";
import { Panel } from "rsuite";
import "./Home.css";

//Home page
export default function Home() {
  return (
    <Container>
      <Panel className="pn">
        <Panel className="pn-header">
          <h1>Eventy</h1>
          <p>
            This is a website giving users finding their events in around the
            world.
          </p>
          <p>
            We provide a quick information of the event including weather,
            tickets' price and news about the events.
          </p>
        </Panel>
      </Panel>
    </Container>
  );
}
