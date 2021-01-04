import React, { useState } from "react";
import styled from "styled-components";
import Card from "react-bootstrap/Card";
import DisabledHoverTooltipper from "../Common/HoverTooltipper";
import { ShowDate } from "../Common/ShowDate";
import { GetUsername } from "../Common/GetUsername.js";
import { ReactComponent as Arrow } from "../../assets/svgs/arrow.svg";
import { service_endpoints } from "../../config/content.json";
import routes from "../../config/routes";
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
  className: `ma2 relative overflow-hidden`,
})`
  min-width: 300px;
`;

const ProfileLink = styled.button.attrs({
  className: `pointer bn b--transparent bg pa0 ma0 bg-transparent dim fw5`,
})``;

const CustomDesc = styled(Card.Text).attrs({ className: `pa0 lh-copy mv2` })`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  /* max-height: 4rem; */
`;

const StyledButton = styled.button.attrs({
  className: `pointer bn b--transparent bg pa0 ma0 bg-transparent dim z-999`,
})`
  margin: 0 0.125rem;
  ${(props) => props.disabled && `pointer-events: none;`}
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
  isAuthenticated,
  token,
  user,
  originalAnnotation,
  allowRedirectToViewImage = true,
  setRoute,
  setRouteData,
  extraClassName,
  isLong,
  indexInParentArray,
  updateAnnotationInParent = () => {},
}) {
  const [annotation, setAnnotation] = useState(originalAnnotation);
  const [currentTotalVotes, setCurrentTotalVotes] = useState(
    annotation.totalVotes
  );
  const [currentUserVoteType, setCurrentUserVoteType] = useState(
    user && annotation.allUserVotes[user.id]
      ? annotation.allUserVotes[user.id]
      : 0
  );

  // useEffect(() => {
  //   setCurrentUserVoteType(originalUserVoteType);
  //   setCurrentTotalVotes(originalTotalVotes);
  // }, [originalUserVoteType, originalTotalVotes]);

  // if (annotationId === "5fef3d4af7335220c5c11e3f") {
  //   console.log("\n\n");
  //   console.log(
  //     "🚀 ~ file: AnnotationCard.js ~ line 70 ~ currentUserVoteType",
  //     currentUserVoteType
  //   );
  //   console.log(
  //     "🚀 ~ file: AnnotationCard.js ~ line 70 ~ originalUserVoteType",
  //     originalUserVoteType
  //   );
  //   console.log(
  //     "🚀 ~ file: AnnotationCard.js ~ line 67 ~ allUserVotes",
  //     allUserVotes
  //   );
  //   console.log(
  //     "🚀 ~ file: AnnotationCard.js ~ line 67 ~ allUserVotes",
  //     allUserVotes[user.id]
  //   );
  // }

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
        annotationId: annotation.annotationId,
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

        // update annotation.
        setAnnotation(res.annotation);

        // update annotation in parent if any.
        updateAnnotationInParent(res.annotation, indexInParentArray);

        console.log("Voted annotation successfully.");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <CustomCard
      onClick={() => {
        if (allowRedirectToViewImage) {
          setRouteData({
            imageId: annotation.imageId,
            annotationToView: annotation,
          });
          setRoute(routes.view_image);
        }
      }}
      className={extraClassName}
    >
      <Card.Body className="flex flex-column justify-between">
        <Card.Subtitle className="pv1">
          <ProfileLink
            onClick={() => {
              setRouteData(annotation.userId);
              setRoute(routes.view_user_profile);
              console.log("Clicked profile");
            }}
          >
            {<GetUsername userId={annotation.userId} />}
          </ProfileLink>{" "}
          @ <ShowDate creationDateTime={annotation.creationDate} /> said:
        </Card.Subtitle>
        {isLong ? (
          <Card.Text className="pa0 lh-copy mv2">
            {annotation.content}
          </Card.Text>
        ) : (
          <CustomDesc>{annotation.content}</CustomDesc>
        )}
        <div className="flex flex-wrap flex-row items-center">
          <Card.Link className="pointer near-black dim pr1">
            {currentTotalVotes}
          </Card.Link>
          <DisabledHoverTooltipper
            actionMsg="upvote"
            enableTooltip={!isAuthenticated}
          >
            <UpvoteButton
              onClick={(e) => handlePOSTVote(e, 1)}
              currentUserVoteType={currentUserVoteType}
              disabled={!isAuthenticated}
            >
              <Upvote />
            </UpvoteButton>
          </DisabledHoverTooltipper>
          <DisabledHoverTooltipper
            actionMsg="downvote"
            enableTooltip={!isAuthenticated}
          >
            <DownvoteButton
              onClick={(e) => handlePOSTVote(e, -1)}
              currentUserVoteType={currentUserVoteType}
              disabled={!isAuthenticated}
            >
              <Downvote />
            </DownvoteButton>
          </DisabledHoverTooltipper>
        </div>
      </Card.Body>
    </CustomCard>
  );
}

export default AnnotationCard;

export function CreateAnnotationForm({ content, extraClassName }) {
  return (
    <div
      className={`mv2 mh2 relative pa0 ma0 bn b--transparent ${extraClassName}`}
    >
      <Card.Text className="pa0 ma0">{content}</Card.Text>
    </div>
  );
}
