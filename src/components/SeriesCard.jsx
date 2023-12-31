import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function SeriesCard({ imgUrl, title, summary }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={imgUrl}
        // width="30"
        // height="30"
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{summary}</Card.Text>
        <Button variant="primary">Ver mas</Button>
      </Card.Body>
    </Card>
  );
}

export default SeriesCard;
