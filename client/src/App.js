import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home/Home";
import EventsPage from "./pages/events/Events";
import EventPage from "./pages/event/Event";

function App() {
  return (
    <Router>
      <div>
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
