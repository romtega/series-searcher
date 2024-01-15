import React, { useState } from "react";
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
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
      </Form>
      <Navbar.Brand href="#home">
        <img
          src="./src/assets/react.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Vite"
        />
      </Navbar.Brand>
    </Navbar>
  );
}

export default MainNavbar;
