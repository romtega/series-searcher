/* eslint-disable jsx-quotes */
/* eslint-disable quotes */
/* eslint-disable semi */

import { useState, useEffect } from "react";
import "./App.css";
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

  useEffect(() => {
    getSeries();
  }, []);

  return (
    <>
      <Navbar />
      {series.map((seriesItem) => (
        <SeriesCard
          key={seriesItem.id}
          title={seriesItem.name}
          imgUrl={seriesItem.image.medium}
          summary={seriesItem.summary}
        />
      ))}
    </>
  );
}

export default App;
