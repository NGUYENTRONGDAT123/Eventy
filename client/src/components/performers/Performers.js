import { Row, Col } from "react-bootstrap";
import { Panel, PanelGroup } from "rsuite";

export default function Performers(props) {
  const { performersData } = props;
  let i = 0;
  return (
    <PanelGroup accordion defaultActiveKey={1} bordered>
      {performersData.map((e) => {
        i++;
        return (
          <Panel header={e.name} shaded bordered eventKey={i}>
            <h2>{e.name}</h2>
            <Row>
              <Col xs={6} md={4}>
                <img src={e.image} alt="" height="240" />
              </Col>
              <Col xs={6} md={8}>
                <p>Type: {e.type.replaceAll("_", " ")}</p>
                <p>Score: {e.score}</p>
              </Col>
            </Row>
          </Panel>
        );
      })}
    </PanelGroup>
  );
}
