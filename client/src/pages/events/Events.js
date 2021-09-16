import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FetchAllEvents } from "../../api/api";
import {
  Panel,
  PanelGroup,
  Form,
  FormGroup,
  FormControl,
  Button,
} from "rsuite";
import { Container, Row, Col, ButtonToolbar } from "react-bootstrap";
import "./Events.css";

// Displayng 25 events
export default function EventsPage() {
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");

  //handle change in search bar
  function handleChange(evt) {
    setInput(evt);
  }

  function handleSearch() {
    setQuery(input);
  }

  const history = useHistory();

  //fetching data
  const { repo, isLoading, error } = FetchAllEvents(query, page);

  const renderPrevButton = () => {
    if (page !== 1) {
      return (
        <Button
          className="button-event"
          onClick={() => setPage(page - 1)}
          block
        >
          Previous
        </Button>
      );
    }
  };

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
  } else if (repo !== [] && error.status === false) {
    return (
      <Container>
        <Form>
          <FormGroup>
            <FormControl
              name="email"
              placeholder="Enter Event Name to Search"
              onChange={handleChange}
              value={input}
            />
            <Button appearance="primary" onClick={handleSearch}>
              Search
            </Button>
          </FormGroup>
        </Form>
        <Row>
          <Col>
            <ButtonToolbar fluid>{renderPrevButton()}</ButtonToolbar>
          </Col>
          <Col className="page-name">
            <p>Page: {page}</p>
          </Col>
          <Col>
            <ButtonToolbar>
              <Button
                className="button-event"
                onClick={() => setPage(page + 1)}
                block
              >
                Next
              </Button>
            </ButtonToolbar>
          </Col>
        </Row>

        <PanelGroup>
          {repo.map((e) => {
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
                    <p>Time: {e.datetime_utc.replace("T", " ")} (UTC)</p>
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
      // <h1>Hello</h1>
    );
  }
}
