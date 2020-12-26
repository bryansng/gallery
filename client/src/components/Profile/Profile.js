import React, { useState } from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Jumbotron from "react-bootstrap/Jumbotron";
import ListGroup from "react-bootstrap/ListGroup";

import Dexter from "../../assets/images/dexter.png";

const Title = styled.p.attrs((props) => ({
  className: `f1 avenir tc`,
}))``;

/**
 * Custom img using styled components and tachyons
 */
const Img = styled.img.attrs((props) => ({
  className: `w-100 w-100-m outline`,
  src: (props) => props.src,
}))`
  margin: 0;
  padding: 0;
`;

const UsernameHeading = styled.p.attrs((props) => ({
  className: `avenir f2 tc`,
}))`
  margin: 0;
  padding: 0;
`;

const Username = styled.p.attrs((props) => ({
  className: `avenir f3 tc`,
}))`
  margin: 0;
  padding: 0;
`;

function Profile() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Jumbotron className="outline tc" fluid>
            <Container>
              <h1>Fluid jumbotron</h1>
              <p>
                This is a modified react-boostrap jumbotron that uses tachyons
                to manipulate its CSS
              </p>
            </Container>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col>
          <Title>Profile</Title>
        </Col>
      </Row>
      <Row>
        <Col>
          <Image className="w-25" src={Dexter} fluid rounded />
        </Col>
      </Row>
      <Row>
        <Col>
          <Img src={Dexter} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup>
            <ListGroup.Item>
              <UsernameHeading>Username</UsernameHeading>
            </ListGroup.Item>
            <ListGroup.Item>
              <Username>Braddy</Username>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>

      <Img src={Dexter} />
    </Container>
  );
}

export default Profile;
