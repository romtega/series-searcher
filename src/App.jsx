/* eslint-disable jsx-quotes */
/* eslint-disable quotes */
/* eslint-disable semi */

import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SeriesCard from "./components/SeriesCard";

function App() {
  const [series, setSeries] = useState([]);

  const getSeries = () => {
    fetch("https://api.tvmaze.com/shows?page=0")
      .then((response) => response.json())
      .then((res) => {
        setSeries(res);
      });
  };

  const getSearch = (searchTerm) => {
    if (searchTerm) {
      fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
        .then((response) => response.json())
        .then((res) => {
          console.log("Search Results:", res);
          setSeries(res);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
        });
    } else {
      getSeries();
    }
  };

  useEffect(() => {
    getSeries();
  }, []);

  return (
    <>
      <Navbar onSearch={getSearch} />
      {series.map((seriesItem, index) => (
        <SeriesCard
          key={seriesItem.id || seriesItem.name || index}
          title={seriesItem.name}
          imgUrl={
            seriesItem.image ? seriesItem.image.medium : "default-image-url"
          }
          summary={seriesItem.summary}
        />
      ))}
    </>
  );
}

export default App;
