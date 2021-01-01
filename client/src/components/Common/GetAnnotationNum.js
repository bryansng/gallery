import { useState, useEffect } from "react";
import { service_endpoints } from "../../config/content.json";

export function GetAnnotationNum({ imageId }) {
  const [number, setNumber] = useState(0);
  useEffect(() => {
    fetch(`${service_endpoints.annotation.get_by_image}/${imageId}`)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error(
          `${resp.status} Image id does not exist in annotation service.`
        );
      })
      .then((res) => {
        setNumber(res.annotations.length);
      })
      .catch((error) => {
        console.error(error);
      });
  });
  return number;
}
