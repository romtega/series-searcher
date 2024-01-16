import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SeriesCard from "./components/SeriesCard";

function App() {
  const [series, setSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getSeries = () => {
    fetch("https://api.tvmaze.com/shows?page=0")
      .then((response) => response.json())
      .then((res) => {
        const seriesWithImages = res.map((show) => ({
          ...show,
          image: show.image ? show.image.medium : "default-image-url",
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
            summary: result.show.summary,
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
    <>
      <Navbar onSearch={handleSearch} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {series.map((seriesItem, index) => (
            <SeriesCard
              key={seriesItem.id || seriesItem.name || index}
              title={seriesItem.name}
              imgUrl={seriesItem.image}
              alt={seriesItem.name}
              summary={seriesItem.summary}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default App;
