import { useState, useEffect } from "react";
import { service_endpoints } from "../../config/content.json";

export function GetImageById(imageId) {
  const [isFetching, setIsFetching] = useState(false);
  const [isImagesFetched, setIsImageFetched] = useState(false);
  const [image, setImage] = useState([]);

  useEffect(() => {
    if (!isFetching) {
      if (imageId && !isImagesFetched) {
        setIsFetching(true);
        fetch(`${service_endpoints.image.get_data}/${imageId}`)
          .then((resp) => {
            if (resp.ok) {
              return resp.json();
            }
            throw new Error(`${resp.status} Image id does not exist.`);
          })
          .then((res) => {
            setImage(res.image);
            setIsFetching(false);
            setIsImageFetched(true);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }, [imageId, isFetching, isImagesFetched]);
  return image;
}
