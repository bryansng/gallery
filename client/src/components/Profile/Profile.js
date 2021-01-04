import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  useGetImagesByUserId,
  useGetAnnotationsByUserId,
} from "./GetUserPosts";
import { useGetUserById } from "../Common/GetUsername";
import ProfileCard from "../Common/ProfileCard";
import ImageHoverSquare from "./ImageHoverSquare";
import AnnotationCard from "../Home/AnnotationCard";

const Title = styled.a.attrs({
  className: `mv2 avenir fw6 f2 dark-gray pointer dim no-underline w-100 tc`,
})`
  :hover {
    text-decoration: none;
    color: #111;
  }
`;

const Container = styled.div.attrs({
  className: `center mv5 flex flex-wrap justify-center items-stretch w-60-l w-70`,
})``;

function Profile({
  token,
  currentSignedInUser,
  routeData,
  setRoute,
  setRouteData,
}) {
  const userIdToView = routeData;
  const { user, setUserIdToGet } = useGetUserById();
  const { images, setUserIdToGetForImages } = useGetImagesByUserId();
  const {
    annotations,
    setUserIdToGetForAnnotations,
  } = useGetAnnotationsByUserId();

  useEffect(() => {
    setUserIdToGet(userIdToView);
    setUserIdToGetForImages(userIdToView);
    setUserIdToGetForAnnotations(userIdToView);
  }, [
    userIdToView,
    setUserIdToGet,
    setUserIdToGetForImages,
    setUserIdToGetForAnnotations,
  ]);

  return (
    <Container>
      <div className="w-100 mv4 flex justify-center center">
        <ProfileCard
          userId={user.id}
          setRoute={setRoute}
          setRouteData={setRouteData}
        />
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
            user={currentSignedInUser}
            originalAnnotation={annotation}
            setRoute={setRoute}
            setRouteData={setRouteData}
            key={index}
            extraClassName="w-third-l w-90 pointer"
          />
        ))}
      </div>
    </Container>
  );
}

export default Profile;
