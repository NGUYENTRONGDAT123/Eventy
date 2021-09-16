const React = require("react");
const axios = require("axios").default;

// fetch all events data
export function FetchAllEvents(q, page) {
  const [repo, setRepo] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [error, setError] = React.useState({ status: false, message: "" });
  const url = `http://localhost:3001/eventsAPI?q=${q}&page=${page}`;
  const getRepo = async () => {
    await axios
      .get(url)
      .then((res) => {
        setRepo(res.data.events);
        setLoading(false);
      })
      .catch((err) => {
        setError({ status: true, message: err.response.data.error });
      });
  };

  React.useEffect(() => {
    setLoading(true);
    getRepo();
    // eslint-disable-next-line
  }, [q, page]);
  if (repo !== []) {
    return { repo, isLoading, error };
  }
}

//fetch one event info and weather info
export function FetchEvent(id) {
  const [isLoading, setLoading] = React.useState(true);
  const [repo, setRepo] = React.useState([]);
  const [error, setError] = React.useState({ status: false, message: "" });
  const url = `http://localhost:3001/eventAPI/${id}`;

  const getRepo = async () => {
    await axios
      .get(url)
      .then((res) => {
        setRepo(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError({ status: true, message: err.response.data.error });
      });
  };

  React.useEffect(() => {
    getRepo();
  });

  return { repo, isLoading, error };
}
