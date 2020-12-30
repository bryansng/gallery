import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Boxes from "./Boxes";
import { service_endpoints } from "../../config/content.json";
import routes from "../../config/routes";
const imageEndpoints = service_endpoints.image;
const annotationEndpoints = service_endpoints.annotation;

const Image = styled.img.attrs({
  className: ``,
})`
  width: auto;
  height: 500px;
`;

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

  return (
    <div className="center">
      <div className="absolute mt2">
        <Boxes
          annotations={annotations}
          setAnnotationToView={setAnnotationToView}
        />
        <Image
          src={`${imageEndpoints.get_image}/${image.id}`}
          alt={image.title}
        />
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
