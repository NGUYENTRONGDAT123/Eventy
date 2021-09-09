import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { PanelGroup, Panel } from "rsuite";
import "./News.css";

//news panel
export default function News(props) {
  //news' data
  const { newsData } = props;

  //news group
  return (
    <Container>
      <PanelGroup>
        {newsData.map((e) => {
          return (
            <Panel shaded bordered bodyFill className="news">
              <h3>{e.title}</h3>
              <Row>
                <Col xs={6} md={4}>
                  <img src={e.urlToImage} alt="" height="240" width="100%" />
                </Col>
                <Col xs={6} md={8}>
                  <p>Source: {e.source.name}</p>
                  <p>Description: {e.description}</p>
                  <p>Plublished At: {e.publishedAt}</p>
                  <p>
                    Link: <a href={e.url}>{e.url}</a>
                  </p>
                </Col>
              </Row>
            </Panel>
          );
        })}
      </PanelGroup>
    </Container>
  );
}
