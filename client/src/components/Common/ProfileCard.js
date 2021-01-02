import React, { useEffect } from "react";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { ShowDate } from "./ShowDate";
import { useGetUserById } from "./GetUsername";
import {
  useGetImagesByUserId,
  useGetAnnotationsByUserId,
} from "../Profile/GetUserPosts";
import routes from "../../config/routes";

// braddy's custom profile card, to be reused on profile and search page

const CustomCard = styled(Card).attrs({
  className: `shadow-5 tc w-50-ns w-80 ma2`,
})``;

const ProfileLink = styled.a.attrs({
  className: `avenir dark-gray pointer dim no-underline`,
})`
  :hover {
    text-decoration: none;
    color: #111;
  }
`;

const Username = styled.p.attrs(() => ({
  className: `avenir f1 grow tc ma0 pa0`,
}))``;

const UserDetailsHeading = styled.p.attrs(() => ({
  className: `avenir f4 tc ma0 pa0`,
}))``;

const UserDetails = styled.p.attrs(() => ({
  className: `avenir f5 fw3 tc`,
}))``;

export default function ProfileCard({
  userId,
  extraClassName,
  scaleSize,
  setRoute,
  setRouteData,
}) {
  const { user, setUserIdToGet } = useGetUserById();
  const { images, setUserIdToGetForImages } = useGetImagesByUserId();
  const {
    annotations,
    setUserIdToGetForAnnotations,
  } = useGetAnnotationsByUserId();

  useEffect(() => {
    setUserIdToGet(userId);
    setUserIdToGetForImages(userId);
    setUserIdToGetForAnnotations(userId);
  }, [
    userId,
    setUserIdToGet,
    setUserIdToGetForImages,
    setUserIdToGetForAnnotations,
  ]);

  return (
    <CustomCard
      className={extraClassName}
      style={{ transform: `scale(${scaleSize})` }}
      onClick={() => {
        setRouteData(user.id);
        setRoute(routes.view_user_profile);
        console.log("Clicked profile");
      }}
    >
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
    </CustomCard>
  );
}
