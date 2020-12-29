import React from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import useFetch from "react-fetch-hook";
import { ImageOverlay } from "react-image-overlay-effect";

import Dexter from "../../assets/images/dexter.png";

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

function Profile() {
  const userData = useFetch("http://localhost:8080/api/users/user/cait");
  const imageData = useFetch(
    "http://localhost:8080/api/images/image/user/cait"
  );
  const annotationData = useFetch(
    "http://localhost:8080/api/image/annotations/annotation/user/cait"
  );

  console.log(userData.data);
  console.log(imageData.data);

  return (
    <Container fluid>
      <Row className="justify-content-md-center mb3">
        <Col className="top-2 mt4  d-flex justify-content-center">
          <Card className="shadow-5 tc w-30">
            <Card.Body>
              <Row className="justify-content-md-center mb3">
                <Col>
                  <Username>
                    {userData.isLoading ? "" : userData.data.user.username}
                  </Username>
                </Col>
              </Row>
              <Row className="mb3">
                <Col lg={4} className="grow">
                  <UserDetailsHeading>Photos</UserDetailsHeading>
                  <UserDetails>
                    {imageData.isLoading ? "" : imageData.data.msg.date}
                  </UserDetails>
                </Col>
                <Col lg={4} className=" grow">
                  <UserDetailsHeading>Date Joined</UserDetailsHeading>
                  <UserDetails>
                    {userData.isLoading ? "" : userData.data.msg.date}
                  </UserDetails>
                </Col>

                <Col lg={4} className="grow">
                  <UserDetailsHeading>Annotations</UserDetailsHeading>
                  <UserDetails>
                    {" "}
                    {annotationData.isLoading
                      ? ""
                      : annotationData.data.msg.date}
                  </UserDetails>
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
                src={Dexter}
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
                src={Dexter}
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
                src={Dexter}
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
                src={Dexter}
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
                src={Dexter}
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
                src={Dexter}
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
