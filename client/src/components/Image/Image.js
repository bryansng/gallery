import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { service_endpoints } from "../../config/content.json";
import routes from "../../config/routes";
const imageEndpoints = service_endpoints.image;
const annotationEndpoints = service_endpoints.annotation;

function Image(props) {
  const { routeData, setRoute, setRouteData } = props;
  const [isImageFetched, setIsImageFetched] = useState(false);
  const [isAnnotationFetched, setIsAnnotationFetched] = useState(false);
  const [image, setImage] = useState(routeData.image);
  // const [image, setImage] = useState({
  //   image: {
  //     id: "5febfa4d641cfd3d12750534",
  //   },
  // });
  const [annotations, setAnnotations] = useState([]);

  if (!image) {
    setRoute(routes.homepage);
  }

  useEffect(() => {
    if (image.id && !isImageFetched) {
      fetch(`${imageEndpoints.get_data}/${image.id}`)
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error(`${resp.status} Image does not exist.`);
        })
        .then((res) => {
          setImage(res.image);
          setRouteData({ image: res.image });
          setIsImageFetched(true);
          console.log("Image data received successfully.");

          if (!isAnnotationFetched) {
            fetch(`${annotationEndpoints.get_by_image}/${image.id}`)
              .then((resp) => {
                if (resp.ok) {
                  return resp.json();
                }
                throw new Error(
                  `${resp.status} No annotations exist with this image id.`
                );
              })
              .then((res) => {
                console.log(res);
                setAnnotations(res.annotations);
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

    // if (!annotations && !isAnnotationFetched && image) {
    // }
  });

  return (
    <div>
      Image Id: {image.id}
      <img src={`${imageEndpoints.get_image}/${image.id}`} alt={image.title} />
      Title: {image.title} <br />
      Description: {image.description}
    </div>
  );
}

export default Image;
