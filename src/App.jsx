import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SeriesCard from "./components/SeriesCard";
import DetailsPage from "./components/DetailsPage";

function App() {
  const [series, setSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getSeries = () => {
    fetch("https://api.tvmaze.com/shows?page=0")
      .then((response) => response.json())
      .then((res) => {
        const seriesWithImages = res.map((show) => ({
          ...show,
          image: show.image.medium,
        }));
        setSeries(seriesWithImages);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching series:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getSeries();
  }, []);

  const handleSearch = (searchTerm) => {
    setIsLoading(true);

    if (searchTerm) {
      fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
        .then((response) => response.json())
        .then((res) => {
          const searchResults = res.map((result) => ({
            id: result.show.id,
            name: result.show.name,
            image: result.show.image
              ? result.show.image.medium
              : "default-image-url",
            genres: result.show.genres,
          }));
          setSeries(searchResults);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
          setIsLoading(false);
        });
    } else {
      getSeries();
    }
  };

  return (
    <Router>
      <>
        <Navbar onSearch={handleSearch} />
        <Routes>
          <Route
            path="/"
            element={<SeriesList series={series} isLoading={isLoading} />}
          />
          <Route path="/details/:id" element={<DetailsPage />} />
        </Routes>
      </>
    </Router>
  );
}

const SeriesList = ({ series, isLoading }) => (
  <div>
    {isLoading ? (
      <p>Loading...</p>
    ) : (
      <div className="row">
        {series.map((seriesItem) => (
          <SeriesCard
            id={seriesItem.id}
            key={seriesItem.id}
            title={seriesItem.name}
            imgUrl={seriesItem.image}
            genres={seriesItem.genres}
            alt={seriesItem.name}
          />
        ))}
      </div>
    )}
  </div>
);

export default App;
