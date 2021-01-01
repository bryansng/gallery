import React, { useState } from "react";
import styled from "styled-components";
import Card from "react-bootstrap/Card";
import { ShowDate } from "../Common/ShowDate";
import { ReactComponent as Arrow } from "../../assets/svgs/arrow.svg";
import { service_endpoints } from "../../config/content.json";
const annotationEndpoints = service_endpoints.annotation;

const Downvote = styled(Arrow).attrs({
  className: ``,
})`
  // padding: 0.125rem 0.1rem;
  // margin: 0.125rem 0.1rem;
  // height: 1rem;
  // width: 1.5rem;
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

const StyledButton = styled.button.attrs({
  className: `pointer bn b--transparent bg pa0 ma0 bg-transparent dim z-999`,
})`
  margin: 0 0.125rem;
`;

const UpvoteButton = styled(StyledButton).attrs({})`
  ${(props) =>
    props.currentUserVoteType && props.currentUserVoteType === 1
      ? `fill: #149df2;`
      : `fill: gray;`}
`;

const DownvoteButton = styled(StyledButton).attrs({})`
  ${(props) =>
    props.currentUserVoteType && props.currentUserVoteType === -1
      ? `fill: #f53d3d;`
      : `fill: gray;`}
`;

function AnnotationCard({
  token,
  user,
  username,
  annotationId,
  creationDate,
  content,
  originalTotalVotes,
  originalUserVoteType,
  onClick = () => {},
  extraClassName,
}) {
  const [currentTotalVotes, setCurrentTotalVotes] = useState(
    originalTotalVotes
  );
  const [currentUserVoteType, setCurrentUserVoteType] = useState(
    originalUserVoteType
  );

  function handlePOSTVote(e, voteType) {
    e.preventDefault();
    e.stopPropagation();

    // POST new annotation.
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify({
        annotationId: annotationId,
        userId: user.id,
        vote: voteType,
      }),
    };

    fetch(annotationEndpoints.vote, requestOptions)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error(`${resp.status}: Unable to vote annotation.`);
      })
      .then((res) => {
        // update which arrow to highlight.
        setCurrentUserVoteType(res.annotation.allUserVotes[user.id]);

        // update total votes on the annotation.
        setCurrentTotalVotes(res.annotation.totalVotes);

        console.log("Voted annotation successfully.");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <CustomCard onClick={() => onClick()} className={extraClassName}>
      <Card.Body>
        <Card.Subtitle className="pv1">
          {username} @ <ShowDate creationDateTime={creationDate} />
        </Card.Subtitle>
        <Card.Text className="pv2">{content}</Card.Text>
        <div className="flex flex-wrap flex-row items-center">
          <Card.Link className="pointer near-black dim pr1">
            {currentTotalVotes}
          </Card.Link>
          <UpvoteButton
            onClick={(e) => handlePOSTVote(e, 1)}
            currentUserVoteType={currentUserVoteType}
          >
            <Upvote />
          </UpvoteButton>
          <DownvoteButton
            onClick={(e) => handlePOSTVote(e, -1)}
            currentUserVoteType={currentUserVoteType}
          >
            <Downvote />
          </DownvoteButton>
        </div>
      </Card.Body>
    </CustomCard>
  );
}

export default AnnotationCard;
