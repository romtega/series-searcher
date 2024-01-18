import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function SeriesCard({ imgUrl, title, genres, id }) {
  return (
    <Card style={{ width: "18rem" }} className="m-2">
      <Card.Img variant="top" src={imgUrl} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{genres.join(", ")}</Card.Text>
        <Link to={`/details/${id}`}>
          <Button variant="primary">Ver más</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default SeriesCard;
