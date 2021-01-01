import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Boxes, { BoundingBoxContainer } from "./Boxes";
import AnnotationCard from "../Home/AnnotationCard";
import { service_endpoints } from "../../config/content.json";
import routes from "../../config/routes";
import placeholderImage from "../../assets/images/placeholder.png";
import { GetUsername } from "../Common/GetUsername.js";
const imageEndpoints = service_endpoints.image;
const annotationEndpoints = service_endpoints.annotation;

// const Button = styled.button.attrs({
//   className: `b--gray ma0 br2 ba hover-bg-light-gray ml1 mr1`,
// })`
//   padding: 6px 20px;
//   transition: 0.15s ease-out;
//   background-color: transparent;
//   min-width: 100px;
//   &:hover {
//     border-color: #505050;
//     transition: 0.15s ease-in;
//   }
// `;

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

const FakeButton = styled(Button)``;

const DrawingRectangle = styled.div.attrs({
  className: ``,
})`
  position: absolute;
  box-shadow: inset 0 0 0 2px #149df2;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  // cursor: pointer;
  pointer-events: none;
`;

const initialCoordsState = {
  x1: 0,
  x2: 0,
  y1: 0,
  y2: 0,
};

const initialRectStyleState = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
};

const Container = styled.div.attrs({
  className: `center mv5 flex flex-wrap mh0 pa0`,
})``;

const ImageContainer = styled.div.attrs({
  className: `center mr1 flex flex-column w-70 ph4 w-100-m ph3-m ma0-m`,
})``;

const Image = styled.img.attrs({
  className: `center ba b--yellow`,
})`
  max-height: 80vh;
  // width: auto;
  // height: 500px;
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
  viewImageId = "5fe931051897c026c1591825";
  const [isFetching, setIsFetching] = useState(false);
  const [isImageFetched, setIsImageFetched] = useState(false);
  const [isAnnotationFetched, setIsAnnotationFetched] = useState(false);
  const [isViewAnnotations, setIsViewAnnotations] = useState(true);
  const [isAddingAnnotation, setIsAddingAnnotation] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [image, setImage] = useState({});
  const [annotations, setAnnotations] = useState([]);
  const [annotationToView, setAnnotationToView] = useState(null);
  const [coordsPercentage, setCoordsPercentage] = useState(initialCoordsState);
  const [drawingRectStyle, setDrawingRectStyle] = useState(
    initialRectStyleState
  );

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

  function getCoordsWithinBoundaryLimits(e) {
    console.log(e.target);
    const imgWidth = e.target.width;
    const imgHeight = e.target.height;
    console.log(`Width, Height: ${imgWidth}, ${imgHeight}`);
  }

  function getClickedCoords(e) {
    // e.persist();
    // offsetX/Y undefined in e, but can be found in e.nativeEvent.
    // https://stackoverflow.com/questions/31519758/reacts-mouseevent-doesnt-have-offsetx-offsety
    // console.log(e.nativeEvent);
    const xCoord = e.nativeEvent.offsetX;
    const yCoord = e.nativeEvent.offsetY;
    console.log(`offset Clicked: x, y: ${xCoord}, ${yCoord}`);
  }

  function startDrawingRectangle(e) {
    e.preventDefault();
    if (!isDrawing && isAddingAnnotation) {
      console.log("Is drawing.");
      setIsDrawing(true);
      setCoordsPercentage({
        x1: e.nativeEvent.offsetX,
        x2: e.nativeEvent.offsetX,
        y1: e.nativeEvent.offsetY,
        y2: e.nativeEvent.offsetY,
      });
      console.log(
        `Start at coords: x, y: ${e.nativeEvent.offsetX}, ${e.nativeEvent.offsetY}`
      );
    }
  }

  function whileDrawingRectangle(e) {
    e.preventDefault();
    if (isDrawing) {
      console.log("Drawing.");
      // update coords.
      setCoordsPercentage({
        ...coordsPercentage,
        x2: e.nativeEvent.offsetX,
        y2: e.nativeEvent.offsetY,
      });
      console.log(
        `Dragged till coords: x, y: ${e.nativeEvent.offsetX}, ${e.nativeEvent.offsetY}`
      );
    }
  }

  function stopDrawingRectangle(e) {
    e.preventDefault();
    if (isDrawing) {
      console.log("Stopped drawing.");
      getCoordsWithinBoundaryLimits(e);
      setIsDrawing(false);
      setCoordsPercentage({
        ...coordsPercentage,
        x2: e.nativeEvent.offsetX,
        y2: e.nativeEvent.offsetY,
      });
      console.log(
        `Stopped at coords: x, y: ${e.nativeEvent.offsetX}, ${e.nativeEvent.offsetY}`
      );
    }
  }

  function preventDragHandler(e) {
    e.preventDefault();
  }

  function toggleAnnotations() {
    setIsViewAnnotations(!isViewAnnotations);
  }

  function startAddingAnnotationProcess() {
    if (!isAddingAnnotation) {
      setIsAddingAnnotation(true);

      // show no annotations.
      setIsViewAnnotations(false);

      // show add annotation form on right of image.

      // show 'Cancel' and 'Add annotation' button.
      console.log("Start adding process.");
    }
  }

  function completeAddingAnnotationProcess() {
    /* adds new annotation here. */
    if (isAddingAnnotation) {
      //

      // POST new annotation.

      // exit add annotation.
      setIsViewAnnotations(true);
      setIsAddingAnnotation(false);
      setCoordsPercentage(initialCoordsState);
      console.log("Completed adding process.");
    }
    //
  }

  function cancelAddingAnnotationProcess() {
    // remove rectangle if drawn.
    setIsViewAnnotations(true);
    setIsAddingAnnotation(false);
    setCoordsPercentage(initialCoordsState);
    console.log("Cancelled adding process.");
  }

  return (
    <Container>
      <Button type="button" onClick={() => toggleAnnotations()}>
        Toggle annotations
      </Button>
      {!isAddingAnnotation ? (
        <Button type="button" onClick={() => startAddingAnnotationProcess()}>
          Add annotation
        </Button>
      ) : (
        <>
          <FakeButton
            type="button"
            onClick={() => cancelAddingAnnotationProcess()}
          >
            Cancel
          </FakeButton>
          <Button
            type="button"
            onClick={() => completeAddingAnnotationProcess()}
          >
            Create
          </Button>
        </>
      )}
      <ImageContainer>
        <div className="">
          {isViewAnnotations && (
            <Boxes
              annotations={annotations}
              setAnnotationToView={setAnnotationToView}
              isAddingAnnotation={isAddingAnnotation}
            />
          )}
          {isAddingAnnotation && (
            <BoundingBoxContainer>
              <DrawingRectangle
                style={{
                  top:
                    coordsPercentage.y2 - coordsPercentage.y1 >= 0
                      ? coordsPercentage.y1
                      : coordsPercentage.y2,
                  left:
                    coordsPercentage.x2 - coordsPercentage.x1 >= 0
                      ? coordsPercentage.x1
                      : coordsPercentage.x2,
                  width:
                    coordsPercentage.x2 - coordsPercentage.x1 === 0
                      ? 1
                      : Math.abs(coordsPercentage.x2 - coordsPercentage.x1),
                  height:
                    coordsPercentage.y2 - coordsPercentage.y1 === 0
                      ? 1
                      : Math.abs(coordsPercentage.y2 - coordsPercentage.y1),
                  zIndex: 99999,
                }}
              />
            </BoundingBoxContainer>
          )}
          <Image
            src={
              image
                ? `${imageEndpoints.get_image}/${image.id}`
                : placeholderImage
            }
            alt={image.title}
            onClick={getClickedCoords}
            onDragStart={preventDragHandler}
            onMouseDown={startDrawingRectangle}
            onMouseUp={stopDrawingRectangle}
            onMouseMove={whileDrawingRectangle}
            onMouseLeave={stopDrawingRectangle}
          />
        </div>
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
