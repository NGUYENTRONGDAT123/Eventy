import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar, Container, Nav, Row } from "react-bootstrap";
import Home from "./pages/home/Home";
import EventsPage from "./pages/events/Events";
import EventPage from "./pages/event/Event";

function App() {
  return (
    <Router>
      <div>
        {/* Navbar */}
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">Eventy</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/events">Events</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        {/* Switch*/}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/events/:id" component={EventPage} />
          <Route path="/events" component={EventsPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
