import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "react-bootstrap/Card";
import { ReactComponent as Arrow } from "../../assets/svgs/arrow.svg";
import routes from "../../config/routes";

const Downvote = styled(Arrow).attrs({
  className: ``,
})`
  height: 1.4rem;
  width: 2rem;
  object-fit: contain;
`;

const Upvote = styled(Arrow).attrs({
  className: ``,
})`
  height: 1.4rem;
  width: 2rem;
  object-fit: contain;
  transform: rotate(180deg);
`;

const CustomCard = styled(Card).attrs({
  className: `mv2 w-25-l w-40-m w-100 relative pointer`,
})`
  min-width: 300px;
`;

const UpvoteButton = styled.button.attrs({
  className: `pointer bn b--transparent bg pa0 ma0 bg-transparent dim`,
})`
  fill: gray;
`;

const DownvoteButton = styled.button.attrs({
  className: `pointer bn b--transparent pa0 ma0 bg-transparent dim`,
})`
  fill: gray;
`;

function AnnotationCard(props) {
  const {
    setRoute,
    setRouteData,
    username,
    creationDate,
    content,
    totalVotes,
    imageId,
  } = props;

  return (
    <CustomCard
      onClick={(e) => {
        e.preventDefault();
        setRoute(routes.view_image);
        setRouteData({
          imageId: { imageId },
        });
        console.log("CLICKED IMAGE");
      }}
    >
      <Card.Body>
        <Card.Subtitle className="pv1">
          {username} @ {creationDate}
        </Card.Subtitle>
        <Card.Text className="pv2">{content}</Card.Text>
        <div className="flex flex-wrap flex-row items-center">
          <Card.Link className="pointer near-black dim">{totalVotes}</Card.Link>
          <UpvoteButton>
            <Upvote />
          </UpvoteButton>
          <DownvoteButton>
            <Downvote />
          </DownvoteButton>
        </div>
      </Card.Body>
    </CustomCard>
  );
}

export default AnnotationCard;
