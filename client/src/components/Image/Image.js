import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Boxes, { BoundingBoxContainer } from "./Boxes";
import AnnotationCard from "../Home/AnnotationCard";
import ResizeObserver from "rc-resize-observer";
import { CreateAnnotationForm } from "../Home/AnnotationCard";
import { service_endpoints } from "../../config/content.json";
// import placeholderImage from "../../assets/images/placeholder.png";
import Form from "react-bootstrap/Form";
import DisabledHoverTooltipper from "../Common/HoverTooltipper";
import { GetUsername } from "../Common/GetUsername.js";
const imageEndpoints = service_endpoints.image;
const annotationEndpoints = service_endpoints.annotation;

const Button = styled.button.attrs({
  className: `ma2 relative w-100 b--gray ma0 br2 ba hover-bg-light-gray tc`,
})`
  padding: 6px 20px;
  transition: 0.15s ease-out;
  background-color: transparent;
  min-width: 100px;
  &:hover {
    border-color: #505050;
    transition: 0.15s ease-in;
  }
  ${(props) => props.disabled && `pointer-events: none;`}
`;

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
  className: `ma0 flex flex-column w-60 pl6 pr-4 w-100-m pl4-m`,
})``;

const ImageCenterer = styled.div.attrs({
  className: `center`,
})``;

const Image = styled.img.attrs({
  className: ``,
})`
  max-height: 60vh;
  user-select: none;
`;

const PlaceholderImageDiv = styled.div.attrs({
  className: `bg-gray`,
})`
  width: 40vw;
  height: 50vh;
  user-select: none;
  opacity: 0.5;
`;

const ImageDescriptionContainer = styled.div.attrs({
  className: `pb4 aspect-ratio--4x3 mh5 mv4 center w-80`,
})``;

const Title = styled.h2.attrs({
  className: `avenir fw6 f2 dark-gray`,
})``;

const AnnotationContainer = styled.div.attrs({
  className: `flex flex-column w-30 pr4 w-100-m ph3-m ma0-m`,
})``;

function ViewImage({
  isAuthenticated,
  token,
  user,
  routeData,
  setRoute,
  setRouteData,
}) {
  var viewImageId = routeData.imageId;
  var routedAnnotationToView = routeData.annotationToView;
  // viewImageId = "5fe931051897c026c1591825";
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
  const imgReference = useRef(null);

  useEffect(() => {
    setIsFetching(false);
    setIsImageFetched(false);
  }, [viewImageId]);

  // useEffect(() => {

  // }, [routedAnnotationToView])

  useEffect(() => {
    if (!isFetching) {
      if (viewImageId && !isImageFetched) {
        setIsFetching(true);
        const requestOptions = {
          method: "PUT",
        };

        fetch(`${imageEndpoints.increment}/${viewImageId}`, requestOptions)
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
                    res.annotations.length > 0
                      ? routedAnnotationToView
                        ? routedAnnotationToView
                        : res.annotations[0]
                      : null
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
    routedAnnotationToView,
    isImageFetched,
    isAnnotationFetched,
    annotationToView,
  ]);

  function getXYCoordsWithinBoundaryLimits(
    preprocessedX,
    preprocessedY,
    imgWidth,
    imgHeight
  ) {
    var processedX = preprocessedX;
    var processedY = preprocessedY;

    if (preprocessedX > imgWidth) {
      processedX = imgWidth;
    } else if (preprocessedX < 0) {
      processedX = 0;
    }

    if (preprocessedY > imgHeight) {
      processedY = imgHeight;
    } else if (preprocessedY < 0) {
      processedY = 0;
    }

    // console.log(`processedX, processedY: ${processedX}, ${processedY}`);
    return { xCoord: processedX, yCoord: processedY };
  }

  function getXYCoordsPercentRelativeToImage(
    preprocessedX,
    preprocessedY,
    imgWidth,
    imgHeight
  ) {
    // console.log(`imgWidth, imgHeight: ${imgWidth}, ${imgHeight}`);

    const { xCoord, yCoord } = getXYCoordsWithinBoundaryLimits(
      preprocessedX,
      preprocessedY,
      imgWidth,
      imgHeight
    );

    const xRelativeToImageWidth = (xCoord / imgWidth) * 100;
    const yRelativeToImageHeight = (yCoord / imgHeight) * 100;

    // console.log(
    //   `xPercent, yPercent: ${xRelativeToImageWidth}, ${yRelativeToImageHeight}`
    // );
    return {
      xCoordPercent: xRelativeToImageWidth,
      yCoordPercent: yRelativeToImageHeight,
    };
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

  function coordPercentToPixel(percentValue, ofValue) {
    return Math.ceil((percentValue * ofValue) / 100);
  }

  function calculateTopStyle(y1, y2, imgWidth, imgHeight) {
    return y2 - y1 >= 0
      ? coordPercentToPixel(y1, imgHeight)
      : coordPercentToPixel(y2, imgHeight);
  }

  function calculateLeftStyle(x1, x2, imgWidth, imgHeight) {
    return x2 - x1 >= 0
      ? coordPercentToPixel(x1, imgWidth)
      : coordPercentToPixel(x2, imgWidth);
  }

  function calculateWidthStyle(x1, x2, imgWidth) {
    return x2 - x1 === 0 ? 1 : coordPercentToPixel(Math.abs(x2 - x1), imgWidth);
  }

  function calculateHeightStyle(y1, y2, imgHeight) {
    return y2 - y1 === 0
      ? 1
      : coordPercentToPixel(Math.abs(y2 - y1), imgHeight);
  }

  function updateDrawingRectStyle(imgWidth, imgHeight) {
    var top = calculateTopStyle(
      coordsPercentage.y1,
      coordsPercentage.y2,
      imgWidth,
      imgHeight
    );
    var left = calculateLeftStyle(
      coordsPercentage.x1,
      coordsPercentage.x2,
      imgWidth,
      imgHeight
    );
    var width = calculateWidthStyle(
      coordsPercentage.x1,
      coordsPercentage.x2,
      imgWidth
    );
    var height = calculateHeightStyle(
      coordsPercentage.y1,
      coordsPercentage.y2,
      imgHeight
    );

    setDrawingRectStyle({ top: top, left: left, width: width, height: height });

    // console.log(
    //   `Coords: left, top, width, height: ${left}, ${top}, ${width}, ${height}`
    // );
  }

  function resizeRectangle() {
    if (
      imgReference &&
      imgReference.current &&
      imgReference.current.width &&
      imgReference.current.height
    ) {
      const imgWidth = imgReference.current.width;
      const imgHeight = imgReference.current.height;
      updateDrawingRectStyle(imgWidth, imgHeight);
    }
  }

  function startDrawingRectangle(e) {
    e.preventDefault();
    if (!isDrawing && isAddingAnnotation) {
      // console.log("\nIs drawing.");
      setIsDrawing(true);

      const offsetX = e.nativeEvent.offsetX;
      const offsetY = e.nativeEvent.offsetY;
      const imgWidth = e.target.width;
      const imgHeight = e.target.height;

      const {
        xCoordPercent,
        yCoordPercent,
      } = getXYCoordsPercentRelativeToImage(
        offsetX,
        offsetY,
        imgWidth,
        imgHeight
      );

      setCoordsPercentage({
        x1: xCoordPercent,
        x2: xCoordPercent,
        y1: yCoordPercent,
        y2: yCoordPercent,
      });
      updateDrawingRectStyle(imgWidth, imgHeight);

      // console.log(
      //   `Start at coords: x, y: ${offsetX}:${xCoordPercent}, ${offsetY}:${yCoordPercent}`
      // );
    }
  }

  function whileDrawingRectangle(e) {
    e.preventDefault();
    if (isDrawing) {
      // console.log("\nDrawing.");

      // update coords.
      const offsetX = e.nativeEvent.offsetX;
      const offsetY = e.nativeEvent.offsetY;
      const imgWidth = e.target.width;
      const imgHeight = e.target.height;

      const {
        xCoordPercent,
        yCoordPercent,
      } = getXYCoordsPercentRelativeToImage(
        offsetX,
        offsetY,
        imgWidth,
        imgHeight
      );

      setCoordsPercentage({
        ...coordsPercentage,
        x2: xCoordPercent,
        y2: yCoordPercent,
      });
      updateDrawingRectStyle(imgWidth, imgHeight);

      // console.log(
      //   `Dragged till coords: x, y: ${offsetX}:${xCoordPercent}, ${offsetY}:${yCoordPercent}`
      // );
    }
  }

  function stopDrawingRectangle(e) {
    e.preventDefault();
    if (isDrawing) {
      const offsetX = e.nativeEvent.offsetX;
      const offsetY = e.nativeEvent.offsetY;
      const imgWidth = e.target.width;
      const imgHeight = e.target.height;

      const {
        xCoordPercent,
        yCoordPercent,
      } = getXYCoordsPercentRelativeToImage(
        offsetX,
        offsetY,
        imgWidth,
        imgHeight
      );

      setCoordsPercentage({
        ...coordsPercentage,
        x2: xCoordPercent,
        y2: yCoordPercent,
      });
      updateDrawingRectStyle(imgWidth, imgHeight);

      // console.log("\nStopped drawing.");
      setIsDrawing(false);

      // console.log(
      //   `Stopped at coords: x, y: ${offsetX}:${xCoordPercent}, ${offsetY}:${yCoordPercent}`
      // );
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

  function completeAddingAnnotationProcess(e) {
    e.preventDefault();

    /* adds new annotation here. */
    if (isAddingAnnotation) {
      // POST new annotation.
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          imageId: image.id,
          content: e.target.formAnnotationContent.value,
          coordinates: {
            x1: coordsPercentage.x1,
            y1: coordsPercentage.y1,
            x2: coordsPercentage.x2,
            y2: coordsPercentage.y2,
          },
        }),
      };

      fetch(annotationEndpoints.create, requestOptions)
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error(`${resp.status}: Unable to add new annotation.`);
        })
        .then((res) => {
          // add annotation to existing annontations array.
          setAnnotations([...annotations, res.annotation]);
          console.log("Created an annotation successfully.");

          // set this annotation to view.
          setAnnotationToView(res.annotation);

          // exit add annotation.
          setIsViewAnnotations(true);
          setIsAddingAnnotation(false);
          setCoordsPercentage(initialCoordsState);
          setDrawingRectStyle(initialRectStyleState);
          console.log("Completed adding process.");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  function cancelAddingAnnotationProcess() {
    // remove rectangle if drawn.
    setIsViewAnnotations(true);
    setIsAddingAnnotation(false);
    setCoordsPercentage(initialCoordsState);
    console.log("Cancelled adding process.");
  }

  function updateAnAnnotation(newAnnotation, indexOfAnnotationInArray) {
    const newAnnotations = annotations
      .slice(0, indexOfAnnotationInArray)
      .concat(newAnnotation)
      .concat(
        annotations.slice(indexOfAnnotationInArray + 1, annotations.length)
      );
    setAnnotations(newAnnotations);
  }

  return (
    <Container>
      <ImageContainer>
        <ImageCenterer>
          {isViewAnnotations &&
            imgReference.current &&
            imgReference.current.width &&
            imgReference.current.height &&
            annotationToView && (
              <Boxes
                annotations={annotations}
                annotationToViewInParent={annotationToView}
                setAnnotationToViewInParent={setAnnotationToView}
                isAddingAnnotation={isAddingAnnotation}
                imgWidth={imgReference.current.width}
                imgHeight={imgReference.current.height}
                calculateTopStyle={calculateTopStyle}
                calculateLeftStyle={calculateLeftStyle}
                calculateWidthStyle={calculateWidthStyle}
                calculateHeightStyle={calculateHeightStyle}
              />
            )}
          {isAddingAnnotation && (
            <BoundingBoxContainer>
              <DrawingRectangle
                style={{
                  top: drawingRectStyle.top,
                  left: drawingRectStyle.left,
                  width: drawingRectStyle.width,
                  height: drawingRectStyle.height,
                  zIndex: 99999,
                }}
              />
            </BoundingBoxContainer>
          )}
          <ResizeObserver onResize={resizeRectangle}>
            {image && image.id ? (
              <Image
                ref={imgReference}
                src={`${imageEndpoints.get_image}/${image.id}`}
                alt={image.title}
                onClick={getClickedCoords}
                onDragStart={preventDragHandler}
                onMouseDown={startDrawingRectangle}
                onMouseUp={stopDrawingRectangle}
                onMouseMove={whileDrawingRectangle}
                onMouseLeave={stopDrawingRectangle}
              />
            ) : (
              // <Image
              //   src={placeholderImage}
              //   alt="Placeholder image"
              //   onDragStart={preventDragHandler}
              // />
              <PlaceholderImageDiv />
            )}
          </ResizeObserver>
        </ImageCenterer>
        <ImageDescriptionContainer>
          <div className="flex justify-between items-center">
            <Title>{image.title}</Title>

            <Form>
              <Form.Check
                type="switch"
                id="toggle-annotations"
                label="Toggle annotations"
                title="Toggle annotations"
                onChange={() => toggleAnnotations()}
                defaultChecked
              />
            </Form>
          </div>

          <p className="i">
            by <GetUsername userId={image.userId} />
          </p>
          {image.description}
        </ImageDescriptionContainer>
      </ImageContainer>

      <AnnotationContainer>
        {!isAddingAnnotation ? (
          <>
            <DisabledHoverTooltipper
              actionMsg="annotate"
              enableTooltip={!isAuthenticated}
            >
              <Button
                type="button"
                onClick={() => startAddingAnnotationProcess()}
                disabled={!isAuthenticated}
              >
                Add annotation
              </Button>
            </DisabledHoverTooltipper>
            {annotationToView &&
              annotations.map(
                (annotation, index) =>
                  annotationToView.annotationId === annotation.annotationId && (
                    <AnnotationCard
                      isAuthenticated={isAuthenticated}
                      token={token}
                      user={user}
                      originalAnnotation={annotation}
                      key={index}
                      indexInParentArray={index}
                      extraClassName="w-100"
                      updateAnnotationInParent={updateAnAnnotation}
                    />
                  )
              )}
          </>
        ) : (
          <>
            <Button
              type="button"
              onClick={() => cancelAddingAnnotationProcess()}
            >
              Cancel
            </Button>

            <Form onSubmit={(e) => completeAddingAnnotationProcess(e)}>
              <Form.Group controlId="formAnnotationContent">
                <CreateAnnotationForm
                  content={
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Try dragging over the image! What do you think?"
                      className="pa0 "
                    ></Form.Control>
                  }
                  extraClassName="w-100"
                />
                <Button type="submit">Create</Button>
              </Form.Group>
            </Form>
          </>
        )}
      </AnnotationContainer>
    </Container>
  );
}

export default ViewImage;
