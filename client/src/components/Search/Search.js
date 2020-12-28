import React, { useState } from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useFetch from "react-fetch-hook";
import { ImageOverlay } from "react-image-overlay-effect";
import { FaUser } from "react-icons/fa";

import Dexter from "../../assets/images/dexter.png";

const Headers = styled.p.attrs(() => ({
  className: `f2 fw3 avenir `,
}))``;

const UserContainer = styled.div.attrs(() => ({
  className: `grow dim pointer`,
}))``;

const Username = styled.p.attrs(() => ({
  className: `avenir pt1 f3 fw3 my-auto`,
}))``;

const Hover = styled.div.attrs(() => ({
  className: `d-flex flex-column justify-content-center align-items-center my-auto`,
}))``;

const HoverContent = styled.div.attrs(() => ({
  className: `text-white my-auto`,
}))``;

function Search() {
  // data.imageResponse.imagesByDescription.searchHits
  // data.imageResponse.imagesByTitle.searchHits
  // data.userResponse.users.searchHits
  const { isLoading, data } = useFetch("http://localhost:8080/api/search/cait");
  const [count, setCount] = useState([0, 1, 2]);
  console.log(data);
  return (
    <Container>
      <Row>
        <Col className="tc">
          <Headers>Images</Headers>
        </Col>
      </Row>
      <Row className="mt3">
        {isLoading
          ? ""
          : count.map((item, key) => {
              return (
                <Col className="tc pointer">
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
              );
            })}
      </Row>
      <Row className="mt3">
        {isLoading
          ? ""
          : count.map((item, key) => {
              return (
                <Col className="tc pointer">
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
              );
            })}
      </Row>
      <Row>
        <Col className="tc mt5">
          <Headers>Users</Headers>
        </Col>
      </Row>
      <Row className="">
        {isLoading
          ? ""
          : count.map((item, key) => {
              return (
                <Col className="tc">
                  <UserContainer>
                    <FaUser size={100}></FaUser>
                    <Username>Dexter</Username>
                  </UserContainer>

                  {/* <Card>
                    
                    <Card.Title className="avenir fw3">Dexter</Card.Title>
                  </Card> */}
                </Col>
              );
            })}
      </Row>
    </Container>
  );
}

export default Search;
