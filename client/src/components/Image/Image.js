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
  const [annotations, setAnnotations] = useState(false);
  var image = routeData.image;

  if (!image) {
    setRoute(routes.homepage);
  }

  useEffect(() => {
    if (!image && !isImageFetched) {
      fetch(`${imageEndpoints.get_data}/${image.id}`)
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error(`${resp.status} Image does not exist.`);
        })
        .then((res) => {
          setRouteData({ image: res.image });
          setIsImageFetched(true);
          console.log("Image data received successfully.");
        })
        .catch((error) => {
          console.error(error);
        });
    }

    // if (!routeData.annotations && !isAnnotationFetched && image) {
    //   fetch(`${annotationEndpoints.get_by_image}/${image.id}`)
    //     .then((resp) => {
    //       if (resp.ok) {
    //         return resp.json();
    //       }
    //       throw new Error(
    //         `${resp.status} No annotations exist with this image id.`
    //       );
    //     })
    //     .then((res) => {
    //       setAnnotations(res.);
    //       setIsAnnotationFetched(true);
    //       console.log("Annotations received successfully.");
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
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
