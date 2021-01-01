import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { ImageOverlay } from "react-image-overlay-effect";
import {
  useGetImagesByUserId,
  useGetAnnotationsByUserId,
} from "./GetUserPosts";
import { ShowDate } from "../Common/ShowDate";
import { GetAnnotationNum } from "../Common/GetAnnotationNum";
import ImageHoverSquare from "./ImageHoverSquare";
import placeholderImage from "../../assets/images/placeholder.png";
import { service_endpoints } from "../../config/content.json";

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

// const Img = styled.img.attrs(() => ({
//   className: `pa3 ba b--light-silver grow pointer img-fluid`,
// }))``;

const Hover = styled.div.attrs(() => ({
  className: `d-flex flex-column justify-content-center align-items-center my-auto`,
}))``;

const HoverContent = styled.div.attrs(() => ({
  className: `text-white my-auto`,
}))``;

const Container = styled.div.attrs({
  className: `center mt5 mb5 flex flex-wrap justify-center`,
})``;

const Title = styled.h2.attrs({
  className: `mt2 mb5 avenir fw6 f2 dark-gray`,
})``;

function Profile({ user }) {
  const images = useGetImagesByUserId(user.id);
  const annotations = useGetAnnotationsByUserId(user.id);

  return (
    <Container>
      <div className="w-100 mv4">
        <Card className="shadow-5 tc w-40 center">
          <Card.Body>
            <Row className="justify-content-md-center mb3">
              <Col>
                <Username>{user.username}</Username>
              </Col>
            </Row>
            <Row className="mb3">
              <Col lg={4} className="grow">
                <UserDetailsHeading>Photos</UserDetailsHeading>
                <UserDetails>{images.length}</UserDetails>
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
                <UserDetailsHeading>Annotations</UserDetailsHeading>
                <UserDetails>{annotations.length}</UserDetails>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
      {images.map((image) => (
        <ImageHoverSquare
          imageUrl={
            { image }
              ? `${service_endpoints.image.get_image}/${image.id}`
              : { placeholderImage }
          }
          title={image.title}
          description={image.description}
          totalViews={image.totalViews}
          annotationNum={<GetAnnotationNum imageId={image.id} />}
        />
      ))}{" "}
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
