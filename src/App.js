import React, { useState, useEffect } from "react";

const App = () => {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("react");
  const [url, setUrl] = useState(
    "https://cors-anywhere.herokuapp.com/http://hn.algolia.com/api/v1/search?query=react"
  );
  const [loading, setLoading] = useState(false);

  const fetchNews = () => {
    setLoading(true);
    fetch(url)
      .then((result) => result.json())
      .then((data) => (setNews(data.hits), setLoading(false)))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchNews();
  }, [url]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`);
  };

  const showLoading = () => (loading ? <div>loading</div> : "");

  const searchForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchQuery} onChange={handleChange} />
        <button>Search</button>
      </form>
    );
  };

  const showNews = () => {
    return news.map((n, i) => {
      return (
        <p key={i}>
          <a href={n.url}>{n.title}</a>
        </p>
      );
    });
  };

  return (
    <div className="container">
      <h2>News</h2>
      {searchForm()}
      {showLoading()}
      {showNews()}
    </div>
  );
};

// const App = () => {
//   const [count, setCount] = useState(0);

//   const increment = () => {
//     setCount(count + 1);
//   };

//   useEffect(() => {
//     document.title = `Clicked ${count} times`;
//   }, [count]);

//   return (
//     <div>
//       <h2>Counter</h2>
//       <button onClick={increment}>Clicked {count} times</button>
//     </div>
//   );
// };

// class App extends Component {
//   state = {
//     count: 0,
//   };

//   increment = () => {
//     this.setState({
//       count: this.state.count + 1,
//     });
//   };

//   componentDidMount() {
//     document.title = `Clicked ${this.state.count} times`;
//   }

//   componentDidUpdate() {
//     document.title = `Clicked ${this.state.count} times`;
//   }

//   render() {
//     return (
//       <div>
//         <h2>Counter</h2>
//         <button onClick={this.increment}>Clicked {this.state.count}</button>
//       </div>
//     );
//   }
// }

export default App;
