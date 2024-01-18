import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";

function DetailsPage() {
  const { id } = useParams();
  const [seriesDetails, setSeriesDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSeriesDetails = () => {
      if (id) {
        fetch(`https://api.tvmaze.com/shows/${id}`)
          .then((response) => response.json())
          .then((data) => {
            setSeriesDetails(data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching series details:", error);
            setIsLoading(false);
          });
      } else {
        console.error("ID is undefined");
        setIsLoading(false);
      }
    };

    fetchSeriesDetails();
  }, [id]);

  return (
    <Card style={{ width: "30rem" }} className="container mt-3">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Card.Body>
          <Card.Img
            variant="top"
            src={seriesDetails.image.medium}
            alt={seriesDetails.name}
            className="img-fluid rounded mb-3"
          />
          <Card.Title>{seriesDetails.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {seriesDetails.genres.join(", ")}
          </Card.Subtitle>
          <Card.Text>{seriesDetails.summary}</Card.Text>
          <Card.Link href="#">Temporadas</Card.Link>
          <Card.Link href="#">Reparto</Card.Link>
        </Card.Body>
      )}
    </Card>
  );
}

export default DetailsPage;
