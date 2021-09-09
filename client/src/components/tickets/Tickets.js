import { Container } from "react-bootstrap";

export default function Tickets(props) {
  //tickets' data
  const { ticketsData, url } = props;

  //Tickets info
  return (
    <Container>
      <p>Tickets Count: {ticketsData.listing_count}</p>
      <p>Average price: ${ticketsData.average_price}</p>
      <p>Highest price: ${ticketsData.highest_price}</p>
      <p>Lowest price: ${ticketsData.lowest_price}</p>
      <p>
        Order At: <a href={url}>{url}</a>
      </p>
    </Container>
  );
}
