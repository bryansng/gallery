import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Boxes from "./Boxes";
import AnnotationCard from "../Home/AnnotationCard";
import { service_endpoints } from "../../config/content.json";
import routes from "../../config/routes";
import placeholderImage from "../../assets/images/placeholder.png";
import { GetUsername } from "../Common/GetUsername.js";
const imageEndpoints = service_endpoints.image;
const annotationEndpoints = service_endpoints.annotation;

const Container = styled.div.attrs({
  className: `center mv5 flex flex-wrap mh0 pa0`,
})``;

const ImageContainer = styled.div.attrs({
  className: `center mr1 flex flex-column w-70 ph4 w-100-m ph3-m ma0-m`,
})``;

const Image = styled.img.attrs({
  className: `center`,
})`
  max-height: 80vh;
`;

const ImageDescriptionContainer = styled.div.attrs({
  className: `pb4`,
})``;

const Title = styled.h2.attrs({
  className: `avenir fw6 f2 dark-gray`,
})``;

const AnnotationContainer = styled.div.attrs({
  className: `center ml1 flex flex-column w-30 pr4 w-100-m ph3-m ma0-m`,
})``;

const Button = styled.button.attrs({
  className: `mv2 mh2 relative w-100 b--gray ma0 br2 ba hover-bg-light-gray tc`,
})`
  padding: 6px 20px;
  transition: 0.15s ease-out;
  background-color: transparent;
  min-width: 100px;
  &:hover {
    border-color: #505050;
    transition: 0.15s ease-in;
  }
`;

function AnnotationPrompt() {
  const [isCreateMode, setCreateMode] = useState(false);
  const [isViewMode, setViewMode] = useState(false);

  return (
    <Button type="button" onClick={() => {}}>
      {isCreateMode ? "Cancel" : "Make an annotation!"}
    </Button>
  );
}

function ViewImage({ routeData, setRoute, setRouteData }) {
  var viewImageId = routeData;
  // viewImageId = "5fe931051897c026c1591825";
  const [isFetching, setIsFetching] = useState(false);
  const [isImageFetched, setIsImageFetched] = useState(false);
  const [isAnnotationFetched, setIsAnnotationFetched] = useState(false);
  const [image, setImage] = useState({});
  const [annotations, setAnnotations] = useState([]);
  const [annotationToView, setAnnotationToView] = useState(null);

  useEffect(() => {
    if (!isFetching) {
      if (viewImageId && !isImageFetched) {
        setIsFetching(true);
        fetch(`${imageEndpoints.get_data}/${viewImageId}`)
          .then((resp) => {
            if (resp.ok) {
              return resp.json();
            }
            throw new Error(`${resp.status} Image does not exist.`);
          })
          .then((res) => {
            setImage(res.image);
            setIsImageFetched(true);
            console.log("Image data received successfully.");

            if (!isAnnotationFetched) {
              fetch(`${annotationEndpoints.get_by_image}/${viewImageId}`)
                .then((resp) => {
                  if (resp.ok) {
                    return resp.json();
                  }
                  throw new Error(
                    `${resp.status} No annotations exist with this image id.`
                  );
                })
                .then((res) => {
                  console.log(
                    "🚀 ~ file: Image.js ~ line 52 ~ .then ~ res",
                    res
                  );
                  setAnnotations(res.annotations);
                  setAnnotationToView(
                    res.annotations.length > 0 ? res.annotations[0] : null
                  );
                  setIsAnnotationFetched(true);
                  console.log("Annotations received successfully.");
                })
                .catch((error) => {
                  console.error(error);
                });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }, [
    isFetching,
    viewImageId,
    isImageFetched,
    isAnnotationFetched,
    annotationToView,
  ]);

  // console.log(image.userId);
  return (
    <Container>
      {/* <Boxes
        annotations={annotations}
        setAnnotationToView={setAnnotationToView}
      /> */}
      <ImageContainer>
        <Image
          src={
            image ? `${imageEndpoints.get_image}/${image.id}` : placeholderImage
          }
          alt={image.title}
        />
        <ImageDescriptionContainer>
          <Title>{image.title}</Title>
          <p className="i">
            by <GetUsername userId={image.userId} />
          </p>
          {image.description}
        </ImageDescriptionContainer>
      </ImageContainer>

      <AnnotationContainer>
        <AnnotationPrompt />
        {annotationToView ? (
          <AnnotationCard
            username={
              annotationToView ? (
                <GetUsername userId={annotationToView.userId} />
              ) : (
                ""
              )
            }
            creationDate={annotationToView ? annotationToView.creationDate : ""}
            content={annotationToView ? annotationToView.content : ""}
            totalVotes={annotationToView ? annotationToView.totalVotes : ""}
            extraClassName="w-100"
          />
        ) : (
          // coordinates:
          // {annotationToView
          //   ? JSON.stringify(annotationToView.rectangleCoordinates)
          //   : ""}{" "}
          // <br />
          ""
        )}
      </AnnotationContainer>
    </Container>
  );
}

export default ViewImage;
