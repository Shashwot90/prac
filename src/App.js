// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
 
// import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
// import axios from 'axios';

// class ShowListPage extends React.Component {
//   state = {
//     shows: [],
//   };

//   componentDidMount() {
//     axios
//       .get('https://api.tvmaze.com/search/shows?q=all')
//       .then((response) => {
//         this.setState({ shows: response.data });
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }

//   render() {
//     const { shows } = this.state;

//     return (
//       <div>
//         <h1>TV Shows</h1>
//         {shows.map((show) => (
//           <div key={show.show.id}>
//             <h2>{show.show.name}</h2>
//             <p>{show.show.type}</p>
//             <p>{show.show.genres}</p>
//             <p>{show.show.status}</p>
//             <p>{show.show.summary}</p>
//             <Link to={`/shows/${show.show.id}`}>View Summary</Link>
//           </div>
//         ))}
//       </div>
//     );
//   }
// }

// function ShowSummaryPage() {
//   const { showId } = useParams();
//   const [summary, setSummary] = useState('');

//   useEffect(() => {
//     axios
//       .get(`https://api.tvmaze.com/shows/${showId}`)
//       .then((response) => {
//         setSummary(response.data.summary);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, [showId]);

//   return (
//     <div>
//       <h1>Show Summary</h1>
//       <p>{summary}</p>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './App.css';

function ShowListPage() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.tvmaze.com/search/shows?q=all')
      .then((response) => {
        setShows(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">TV Shows</h1>
      <div className="show-list">
      {shows.map((show) => (
        <div key={show.show.id} className="show-card">
          <h2 className="show-name">{show.show.name}</h2>
          <img
            src={show.show.image ? show.show.image.medium : ''}
            alt={show.show.name}
            className="show-image"
          />
          <p className="show-summary">{show.show.summary}</p>
          <Link to={`/shows/${show.show.id}`} className="view-summary-btn">
            View Summary
          </Link>
        </div>
      ))}
      </div>
    </div>
  );
}

function ShowSummaryPage() {
  const { showId } = useParams();
  const [summary, setSummary] = useState('');

  useEffect(() => {
    axios
      .get(`https://api.tvmaze.com/shows/${showId}`)
      .then((response) => {
        setSummary(response.data.summary);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [showId]);

  return (
    <div className="container">
      <h1 className="title">Show Summary</h1>
      <p className="summary">{summary}</p>
      <Link to={`/book/${showId}`} className="book-ticket-btn">
        Book Ticket
      </Link>
    </div>
  );
}

function BookTicketPage(props) {
  const { showId } = useParams();
  const [movieName, setMovieName] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    showId: showId,
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store user details in local storage or perform any desired action
    console.log(formData);
  };

  useEffect(() => {
    axios
      .get(`https://api.tvmaze.com/shows/${showId}`)
      .then((response) => {
        setMovieName(response.data.name);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [showId]);

  return (
    <div className="container">
      <h1 className="title">Book Ticket</h1>
      <h2 className="movie-name">{movieName}</h2>
      <form className="ticket-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}



function App() {
  return (
    <Router>
      <div>
      <Routes>
        <Route exact path="/" element={<ShowListPage />} />
        <Route path="/shows/:showId" element={<ShowSummaryPage />} />
        <Route exact path="/book/:showId" element={<BookTicketPage />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
