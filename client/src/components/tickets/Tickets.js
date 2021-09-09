import { Container } from "react-bootstrap";

export default function Tickets(props) {
  const { ticketsData, url } = props;

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

// "stats": {
//             "listing_count": 1,
//             "average_price": 133,
//             "lowest_price_good_deals": null,
//             "lowest_price": 133,
//             "highest_price": 190,
//             "visible_listing_count": 1,
//             "dq_bucket_counts": [
//                 0,
//                 0,
//                 0,
//                 0,
//                 0,
//                 0,
//                 0,
//                 1
//             ],
//             "median_price": 127,
//             "lowest_sg_base_price": 88,
//             "lowest_sg_base_price_good_deals": null
//         },
