import React from "react";
import styled from "styled-components";
import Card from "react-bootstrap/Card";
import * as dayjs from "dayjs";
import { ReactComponent as Arrow } from "../../assets/svgs/arrow.svg";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
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
  className: `mv2 mh2 relative`,
})``;

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

function AnnotationCard({
  username,
  creationDate,
  content,
  totalVotes,
  onClick = () => {},
  extraClassName,
}) {
  return (
    <CustomCard onClick={() => onClick()} className={extraClassName}>
      <Card.Body>
        <Card.Subtitle className="pv1">
          {username} @ {dayjs(creationDate).fromNow()}
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
