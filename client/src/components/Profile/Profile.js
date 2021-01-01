import React from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import useFetch from "react-fetch-hook";
import { ImageOverlay } from "react-image-overlay-effect";

import placeholderImage from "../../assets/images/placeholder.png";

/**
 * Custom img using styled components and tachyons
 */
const Username = styled.p.attrs(() => ({
  className: `avenir f1 grow tc`,
}))`
  margin: 0;
  padding: 0;
`;

const UserDetailsHeading = styled.p.attrs(() => ({
  className: `avenir f4 tc`,
}))`
  margin: 0;
  padding: 0;
`;

const UserDetails = styled.p.attrs(() => ({
  className: `avenir f5 fw3 tc`,
}))``;

const UserObjectHeading = styled.a.attrs(() => ({
  className: `avenir gray pointer link dim f2 fw3 `,
}))``;

const Img = styled.img.attrs(() => ({
  className: `pa3 ba b--light-silver grow pointer img-fluid`,
}))``;

const Hover = styled.div.attrs(() => ({
  className: `d-flex flex-column justify-content-center align-items-center my-auto`,
}))``;

const HoverContent = styled.div.attrs(() => ({
  className: `text-white my-auto`,
}))``;

function Profile({ user }) {
  /*
  TODO - fetch images by user.
  TODO - fetch annotations by user.
   */
  return (
    <Container fluid>
      <Row className="justify-content-md-center mb3">
        <Col className="top-2 mt4  d-flex justify-content-center">
          <Card className="shadow-5 tc w-30">
            <Card.Body>
              <Row className="justify-content-md-center mb3">
                <Col>
                  <Username>{user ? user.username : ""}</Username>
                </Col>
              </Row>
              <Row className="mb3">
                <Col lg={4} className="grow">
                  <UserDetailsHeading>Photos</UserDetailsHeading>
                  <UserDetails>25</UserDetails>
                </Col>
                <Col lg={4} className=" grow">
                  <UserDetailsHeading>Date Joined</UserDetailsHeading>
                  <UserDetails>
                    {user ? user.creationDate.split("T")[0] : ""}
                  </UserDetails>
                </Col>

                <Col lg={4} className="grow">
                  <UserDetailsHeading>Annotations</UserDetailsHeading>
                  <UserDetails>50</UserDetails>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-md-center pt5">
        <Col className="tc" lg={6}>
          <Row className="">
            <Col className="d-flex justify-content-center tc">
              <UserObjectHeading>Photos</UserObjectHeading>
            </Col>
          </Row>
          <Row className="mt3">
            <Col>
              <ImageOverlay
                className="mw5"
                src={placeholderImage}
                description={
                  <Hover>
                    <HoverContent>Title</HoverContent>
                    <HoverContent>Description</HoverContent>
                    <HoverContent>User</HoverContent>
                  </Hover>
                }
              />
            </Col>
            <Col>
              <ImageOverlay
                className="mw5"
                src={placeholderImage}
                description={
                  <Hover>
                    <HoverContent>Title</HoverContent>
                    <HoverContent>Description</HoverContent>
                    <HoverContent>User</HoverContent>
                  </Hover>
                }
              />
            </Col>
            <Col>
              <ImageOverlay
                className="mw5"
                src={placeholderImage}
                description={
                  <Hover>
                    <HoverContent>Title</HoverContent>
                    <HoverContent>Description</HoverContent>
                    <HoverContent>User</HoverContent>
                  </Hover>
                }
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-md-center pt5">
        <Col className="tc" lg={6}>
          <Row className="">
            <Col className="d-flex justify-content-center tc">
              <UserObjectHeading>Annotations</UserObjectHeading>
            </Col>
          </Row>
          <Row className="mt3">
            <Col>
              <ImageOverlay
                className="mw5"
                src={placeholderImage}
                description={
                  <Hover>
                    <HoverContent>Title</HoverContent>
                    <HoverContent>Description</HoverContent>
                    <HoverContent>User</HoverContent>
                  </Hover>
                }
              />
            </Col>
            <Col>
              <ImageOverlay
                className="mw5"
                src={placeholderImage}
                description={
                  <Hover>
                    <HoverContent>Title</HoverContent>
                    <HoverContent>Description</HoverContent>
                    <HoverContent>User</HoverContent>
                  </Hover>
                }
              />
            </Col>
            <Col>
              <ImageOverlay
                className="mw5"
                src={placeholderImage}
                description={
                  <Hover>
                    <HoverContent>Title</HoverContent>
                    <HoverContent>Description</HoverContent>
                    <HoverContent>User</HoverContent>
                  </Hover>
                }
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
