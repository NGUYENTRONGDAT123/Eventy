const React = require("react");
const axios = require("axios").default;

// fetch all events data
export function FetchAllEvents() {
  const [repo, setRepo] = React.useState([]);
  const url = `/eventsAPI`;

  const getRepo = async () => {
    try {
      const res = await axios.get(url);
      if (res.statusText === "OK") {
        // console.log(res.data);
        const myRepo = res.data.events;
        setRepo(myRepo);
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getRepo();
  }, []);
  if (repo !== []) {
    return repo;
  }
}

//fetch one event info and weather info
export function FetchEvent(id) {
  const [isLoading, setLoading] = React.useState(true);
  const [repo, setRepo] = React.useState([]);
  const url = `/eventAPI/${id}`;

  const getRepo = async () => {
    try {
      const res = await axios.get(url);
      if (res.statusText === "OK") {
        const myRepo = res.data;
        console.log(myRepo);
        setRepo(myRepo);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getRepo();
  }, []);

  return { repo, isLoading };
}
