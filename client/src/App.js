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
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">Eventy</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/events">Events</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/events/:id" component={EventPage} />
          <Route path="/events" component={EventsPage} />
          <Route path="/?code=crd.EA.CAESEJYh861XAEPkih_pJqpSvOQiATE.lZz8rAurE79OKwrI9W8EdvRs71_bdzJLjoF-Vt9NlE4#_" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
