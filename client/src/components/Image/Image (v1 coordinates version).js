import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Boxes, { BoundingBoxContainer } from "./Boxes";
import { service_endpoints } from "../../config/content.json";
import routes from "../../config/routes";
const imageEndpoints = service_endpoints.image;
const annotationEndpoints = service_endpoints.annotation;

const Button = styled.button.attrs({
  className: `b--gray ma0 br2 ba hover-bg-light-gray ml1 mr1`,
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

const Image = styled.img.attrs({
  className: `ba b--yellow`,
})`
  width: auto;
  height: 500px;
`;

const initialCoordsState = {
  x1: 0,
  x2: 0,
  y1: 0,
  y2: 0,
};

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
  const [coords, setCoords] = useState(initialCoordsState);

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

  function getCoordsWithinBoundaryLimits(e) {
    console.log(e.target);
  }

  function getClickedCoords(e) {
    // e.persist();
    // offsetX/Y undefined in e, but can be found in e.nativeEvent.
    // https://stackoverflow.com/questions/31519758/reacts-mouseevent-doesnt-have-offsetx-offsety
    console.log(e.nativeEvent);
    const xCoord = e.nativeEvent.offsetX;
    const yCoord = e.nativeEvent.offsetY;
    console.log(`offset Clicked: x, y: ${xCoord}, ${yCoord}`);
  }

  function startDrawingRectangle(e) {
    e.preventDefault();
    if (!isDrawing && isAddingAnnotation) {
      console.log("Is drawing.");
      setIsDrawing(true);
      setCoords({
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
      setCoords({
        ...coords,
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
      console.log(e.target.width);
      console.log(e.target.height);
      setIsDrawing(false);
      setCoords({
        ...coords,
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
      setCoords(initialCoordsState);
      console.log("Completed adding process.");
    }
    //
  }

  function cancelAddingAnnotationProcess() {
    // remove rectangle if drawn.
    setIsViewAnnotations(true);
    setIsAddingAnnotation(false);
    setCoords(initialCoordsState);
    console.log("Cancelled adding process.");
  }

  return (
    <div className="my-2 mx-5 ba">
      <div className="">
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
                  top: coords.y2 - coords.y1 >= 0 ? coords.y1 : coords.y2,
                  left: coords.x2 - coords.x1 >= 0 ? coords.x1 : coords.x2,
                  width:
                    coords.x2 - coords.x1 === 0
                      ? 1
                      : Math.abs(coords.x2 - coords.x1),
                  height:
                    coords.y2 - coords.y1 === 0
                      ? 1
                      : Math.abs(coords.y2 - coords.y1),
                  zIndex: 99999,
                }}
              />
            </BoundingBoxContainer>
          )}
          <Image
            src={`${imageEndpoints.get_image}/${image.id}`}
            alt={image.title}
            onClick={getClickedCoords}
            onDragStart={preventDragHandler}
            onMouseDown={startDrawingRectangle}
            onMouseUp={stopDrawingRectangle}
            onMouseMove={whileDrawingRectangle}
            onMouseLeave={stopDrawingRectangle}
          />
        </div>
        <div className="pb4">
          Image Id: {image.id} <br />
          Title: {image.title} <br />
          Description: {image.description} <br />
        </div>
        <div>
          Annotation id: {annotationToView ? annotationToView.annotationId : ""}
          <br />
          User id: {annotationToView ? annotationToView.userId : ""} <br />
          image id: {annotationToView ? annotationToView.imageId : ""} <br />
          content: {annotationToView ? annotationToView.content : ""} <br />
          total votes: {annotationToView ? annotationToView.totalVotes : ""}
          <br />
          coordinates:
          {annotationToView
            ? JSON.stringify(annotationToView.rectangleCoordinates)
            : ""}{" "}
          <br />
        </div>
      </div>
    </div>
  );
}

export default ViewImage;
