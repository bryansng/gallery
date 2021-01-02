import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import {
  useGetImagesByUserId,
  useGetAnnotationsByUserId,
} from "./GetUserPosts";
import { ShowDate } from "../Common/ShowDate";
import { GetAnnotationNum } from "../Common/GetAnnotationNum";
import ImageHoverSquare from "./ImageHoverSquare";
import placeholderImage from "../../assets/images/placeholder.png";
import { service_endpoints } from "../../config/content.json";
import AnnotationCard from "../Home/AnnotationCard";

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

// const UserObjectHeading = styled.h3.attrs(() => ({
//   className: `avenir near-black f2 tc w-100`,
// }))`
//   /* this used to be a link with class gray pointer and dim */
// `;

// const Img = styled.img.attrs(() => ({
//   className: `pa3 ba b--light-silver grow pointer img-fluid`,
// }))``;

// const Hover = styled.div.attrs(() => ({
//   className: `d-flex flex-column justify-content-center align-items-center my-auto`,
// }))``;

// const HoverContent = styled.div.attrs(() => ({
//   className: `text-white my-auto`,
// }))``;

const Title = styled.a.attrs({
  className: `mv2 avenir fw6 f2 dark-gray pointer dim no-underline`,
})`
  :hover {
    text-decoration: none;
    color: #111;
  }
`;

const ProfileLink = styled.a.attrs({
  className: `avenir dark-gray pointer dim no-underline`,
})`
  :hover {
    text-decoration: none;
    color: #111;
  }
`;

const Container = styled.div.attrs({
  className: `center mv5 flex flex-wrap justify-center items-stretch`,
})``;

function Profile({ token, user, setRoute, setRouteData }) {
  const images = useGetImagesByUserId(user.id);
  const annotations = useGetAnnotationsByUserId(user.id);

  return (
    <Container>
      <div className="w-100 mv4">
        <Card className="shadow-5 tc w-50-ns w-80 center">
          <Card.Body>
            <Row className="justify-content-md-center mb3">
              <Col>
                <Username>{user.username}</Username>
              </Col>
            </Row>
            <Row className="mb3">
              <Col lg={4} className="grow" href="photos">
                <ProfileLink href="#photos">
                  <UserDetailsHeading>Photos</UserDetailsHeading>
                  <UserDetails>{images.length}</UserDetails>
                </ProfileLink>
              </Col>
              <Col lg={4} className=" grow">
                <UserDetailsHeading>Date Joined</UserDetailsHeading>
                <UserDetails>
                  {
                    <ShowDate
                      creationDateTime={user.creationDate}
                      placement="bottom"
                    />
                  }
                </UserDetails>
              </Col>
              <Col lg={4} className="grow">
                <ProfileLink href="#annotations">
                  <UserDetailsHeading>Annotations</UserDetailsHeading>
                  <UserDetails>{annotations.length}</UserDetails>
                </ProfileLink>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
      <Title id="photos">Photos</Title>
      <div className="center mv3 flex flex-wrap justify-center items-stretch">
        {images.map((image, index) => (
          <ImageHoverSquare
            key={index}
            image={image}
            setRoute={setRoute}
            setRouteData={setRouteData}
          />
        ))}
      </div>
      <Title id="annotations">Annotations</Title>
      <div className="center mv3 flex flex-wrap justify-center items-stretch">
        {annotations.map((annotation, index) => (
          <AnnotationCard
            token={token}
            user={user}
            originalAnnotation={annotation}
            setRoute={setRoute}
            setRouteData={setRouteData}
            key={index}
            extraClassName="w-40-l pointer"
          />
        ))}
      </div>
    </Container>
    // <Container fluid>
    //   <Row className="justify-content-md-center mb3">
    //     <Col className="top-2 mt4  d-flex justify-content-center">
    // <Card className="shadow-5 tc w-30">
    //   <Card.Body>
    //     <Row className="justify-content-md-center mb3">
    //       <Col>
    //         <Username>{user.username}</Username>
    //       </Col>
    //     </Row>
    //     <Row className="mb3">
    //       <Col lg={4} className="grow">
    //         <UserDetailsHeading>Photos</UserDetailsHeading>
    //         <UserDetails>{images.length}</UserDetails>
    //       </Col>
    //       <Col lg={4} className=" grow">
    //         <UserDetailsHeading>Date Joined</UserDetailsHeading>
    //         <UserDetails>{user.creationDate}</UserDetails>
    //       </Col>

    //       <Col lg={4} className="grow">
    //         <UserDetailsHeading>Annotations</UserDetailsHeading>
    //         <UserDetails>{annotations.length}</UserDetails>
    //       </Col>
    //     </Row>
    //   </Card.Body>
    // </Card>
    //     </Col>
    //   </Row>
    //   <Row className="justify-content-md-center pt5">
    //     <Col className="tc" lg={6}>
    //       <Row className="">
    //         <Col className="d-flex justify-content-center tc">
    //           <UserObjectHeading>Photos</UserObjectHeading>
    //         </Col>
    //       </Row>
    //       <Row className="mt3">
    //         {images.map((image) => (
    //           <Col>
    //             <ImageOverlay
    //               className="object-contain center"
    //               src={
    //                 { image }
    //                   ? `${service_endpoints.image.get_image}/${image.id}`
    //                   : { placeholderImage }
    //               }
    //               description={
    //                 <Hover>
    //                   <HoverContent>{image.title}</HoverContent>
    //                   <HoverContent>{image.description}</HoverContent>
    //                   <HoverContent></HoverContent>
    //                 </Hover>
    //               }
    //             />
    //           </Col>
    //         ))}

    //         {/* <Col>
    //           <ImageOverlay
    //             className="mw5"
    //             src={placeholderImage}
    //             description={
    //               <Hover>
    //                 <HoverContent>Title</HoverContent>
    //                 <HoverContent>Description</HoverContent>
    //                 <HoverContent>User</HoverContent>
    //               </Hover>
    //             }
    //           />
    //         </Col>
    //         <Col>
    //           <ImageOverlay
    //             className="mw5"
    //             src={placeholderImage}
    //             description={
    //               <Hover>
    //                 <HoverContent>Title</HoverContent>
    //                 <HoverContent>Description</HoverContent>
    //                 <HoverContent>User</HoverContent>
    //               </Hover>
    //             }
    //           />
    //         </Col> */}
    //       </Row>
    //     </Col>
    //   </Row>
    //   <Row className="justify-content-md-center pt5">
    //     <Col className="tc" lg={6}>
    //       <Row className="">
    //         <Col className="d-flex justify-content-center tc">
    //           <UserObjectHeading>Annotations</UserObjectHeading>
    //         </Col>
    //       </Row>
    //       <Row className="mt3">
    //         {annotations.map((annotation) => (
    //           <Col>
    //             <ImageOverlay
    //               className="mw5"
    //               src={placeholderImage}
    //               description={
    //                 <Hover>
    //                   <HoverContent>
    //                     {user.username} @{" "}
    //                     <ShowDate creationDateTime={annotation.creationDate} />
    //                   </HoverContent>
    //                   <HoverContent>{annotation.content}</HoverContent>
    //                   <HoverContent>{annotation.totalVotes}</HoverContent>
    //                 </Hover>
    //               }
    //             />
    //           </Col>
    //         ))}

    //         {/* <Col>
    //           <ImageOverlay
    //             className="mw5"
    //             src={placeholderImage}
    //             description={
    //               <Hover>
    //                 <HoverContent>Title</HoverContent>
    //                 <HoverContent>Description</HoverContent>
    //                 <HoverContent>User</HoverContent>
    //               </Hover>
    //             }
    //           />
    //         </Col>
    //         <Col>
    //           <ImageOverlay
    //             className="mw5"
    //             src={placeholderImage}
    //             description={
    //               <Hover>
    //                 <HoverContent>Title</HoverContent>
    //                 <HoverContent>Description</HoverContent>
    //                 <HoverContent>User</HoverContent>
    //               </Hover>
    //             }
    //           />
    //         </Col> */}
    //       </Row>
    //     </Col>
    //   </Row>
    // </Container>
  );
}

export default Profile;
