import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function MainNavbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Navbar
      className="bg-body-tertiary justify-content-between"
      data-bs-theme="dark"
    >
      <Navbar.Brand href="/">
        <img
          src="./src/assets/tvmaze-icon-filled-256.webp"
          width="50"
          height="50"
          className="d-inline-block align-top"
          alt="React"
        />
      </Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="#peliculas">Peliculas</Nav.Link>
        <Nav.Link href="#series">Series</Nav.Link>
      </Nav>
      <Form className="inline" onSubmit={handleSubmit}>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Busca una serie"
              className="mr-sm-2"
              data-bs-theme="light"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Search</Button>
          </Col>
        </Row>
      </Form>
    </Navbar>
  );
}

export default MainNavbar;
