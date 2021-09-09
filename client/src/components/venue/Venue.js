import { Container, Row, Col } from "react-bootstrap";
import { Panel } from "rsuite";

export default function Venue(props) {
  const { venueData } = props;
  console.log(venueData);
  return (
    <Container>
      <Panel>
        <Row>
          <Col xs={6} md={4}>
            <img
              src={venueData.performers[0].image}
              alt="One Event"
              height="240"
            />
          </Col>
          <Col xs={6} md={8}>
            <p>Time: {venueData.datetime_local}</p>
            <p>Venue: {venueData.venue.name}</p>
            <p>Type: {venueData.type.replaceAll("_", " ")}</p>
            <p>Address: {venueData.venue.address}</p>
            <p>City: {venueData.venue.city}</p>
            <p>Country: {venueData.venue.country}</p>
          </Col>
        </Row>
      </Panel>
    </Container>
  );
}
