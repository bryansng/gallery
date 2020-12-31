import { useState, useEffect } from "react";
import { service_endpoints } from "../../config/content.json";

export function GetAnnotationNum(props) {
  const { imageId } = props;
  const [number, setNumber] = useState(0);
  useEffect(() => {
    fetch(`${service_endpoints.annotation.get_by_image}/${imageId}`)
      .then((resp) => resp.json())
      .then((res) => {
        setNumber(res.annotations.length);
      });
  });
  return number;
}
