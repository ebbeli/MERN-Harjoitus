import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const Footer = () => {
  return (
    <Container
      className=" border-top justify-content-center footer "
      variant="dark"
      style={{ padding: 5 }}
      fluid
    >
      <Row className="justify-content-center">
        <h6 className="justify-content-center">
          Tekijä: <b>Eino Rissanen</b>
        </h6>
      </Row>
    </Container>
  );
};

export default Footer;
