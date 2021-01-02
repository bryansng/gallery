import React, { useState } from "react";
import styled from "styled-components";
// import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useFetch from "react-fetch-hook";
import { ImageOverlay } from "react-image-overlay-effect";
import { FaUser } from "react-icons/fa";
import content from "../../config/content.json";
import Dexter from "../../assets/images/dexter.png";
import { ShowDate } from "../Common/ShowDate";
import { GetAnnotationNum } from "../Common/GetAnnotationNum";
import ImageHoverSquare from "../Profile/ImageHoverSquare";
import placeholderImage from "../../assets/images/placeholder.png";
import { service_endpoints } from "../../config/content.json";
const searchEndpoints = content.service_endpoints.search;

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

const Container = styled.div.attrs({
  className: `center mt5 mb5 w-60-l w-70 flex flex-wrap justify-center`,
})``;

const Title = styled.h2.attrs({
  className: `mv2 avenir fw6 f2 dark-gray w-100`,
})``;

function Search({ routeData, setRoute, setRouteData }) {
  const searchKeyword = routeData;
  const { isLoading, data } = useFetch(
    `${searchEndpoints.search}/${searchKeyword}`
  );

  if (!isLoading) {
    console.log(data);
  }

  return (
    <Container>
      {data.imageResponse.imagesByTitle.totalHits > 0 ? (
        <>
          <Title>Images by title</Title>
          {isLoading
            ? "Loading..."
            : data.imageResponse.imagesByTitle.searchHits.map(
                (image, index) => (
                  <ImageHoverSquare
                    key={index}
                    image={image}
                    setRoute={setRoute}
                    setRouteData={setRouteData}
                    showUsername
                  />
                )
              )}
        </>
      ) : (
        ""
      )}

      {data.imageResponse.imagesByDescription.totalHits > 0 ? (
        <>
          <Title>Images by description</Title>
          {isLoading
            ? ""
            : data.imageResponse.imagesByDescription.searchHits.map(
                (image, index) => (
                  <ImageHoverSquare
                    key={index}
                    image={image}
                    setRoute={setRoute}
                    setRouteData={setRouteData}
                    showUsername
                  />
                )
              )}
        </>
      ) : (
        ""
      )}

      <Title>Users</Title>
    </Container>
    //   <Row className="">
    //     {isLoading
    //       ? ""
    //       : data.userResponse.users.searchHits.map((item, key) => {
    //           return (
    //             <Col className="tc" key={key}>
    //               <UserContainer>
    //                 <FaUser size={100}></FaUser>
    //                 <Username>{item.content.username}</Username>
    //               </UserContainer>

    //               {/* <Card>

    //                 <Card.Title className="avenir fw3">Dexter</Card.Title>
    //               </Card> */}
    //             </Col>
    //           );
    //         })}
    //   </Row>
    // </Container>
  );
}

export default Search;
