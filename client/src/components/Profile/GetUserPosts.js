import { useEffect, useState } from "react";
import { service_endpoints } from "../../config/content.json";

// get image by user
export function useGetImagesByUserId() {
  const [userId, setUserId] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (userId) {
      fetch(`${service_endpoints.image.get_by_user}/${userId}`)
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error(`${resp.status} User id does not exist.`);
        })
        .then((res) => {
          setImages(res.images);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userId]);

  function setUserIdToGetForImages(userId) {
    setUserId(userId);
  }

  return { images, setUserIdToGetForImages };
}

// export function useGetImagesByUserId(userId) {
//   const [isFetching, setIsFetching] = useState(false);
//   const [isImagesFetched, setIsImagesFetched] = useState(false);
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     if (!isFetching) {
//       if (userId && !isImagesFetched) {
//         setIsFetching(true);
//         fetch(`${service_endpoints.image.get_by_user}/${userId}`)
//           .then((resp) => {
//             if (resp.ok) {
//               return resp.json();
//             }
//             throw new Error(`${resp.status} User id does not exist.`);
//           })
//           .then((res) => {
//             setImages(res.images);
//             setIsFetching(false);
//             setIsImagesFetched(true);
//           })
//           .catch((error) => {
//             console.error(error);
//           });
//       }
//     }
//   }, [userId, isFetching, isImagesFetched]);
//   return images;
// }

// get annotations by user id
export function useGetAnnotationsByUserId() {
  const [userId, setUserId] = useState(null);
  const [annotations, setAnnotations] = useState([]);

  useEffect(() => {
    if (userId) {
      fetch(`${service_endpoints.annotation.get_by_user}/${userId}`)
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error(`${resp.status} User id does not exist.`);
        })
        .then((res) => {
          setAnnotations(res.annotations);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userId]);

  function setUserIdToGetForAnnotations(userId) {
    setUserId(userId);
  }

  return { annotations, setUserIdToGetForAnnotations };
}

// export function useGetAnnotationsByUserId(userId) {
//   const [isFetching, setIsFetching] = useState(false);
//   const [isImagesFetched, setIsImagesFetched] = useState(false);
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     if (!isFetching) {
//       if (userId && !isImagesFetched) {
//         setIsFetching(true);
//         fetch(`${service_endpoints.annotation.get_by_user}/${userId}`)
//           .then((resp) => {
//             if (resp.ok) {
//               return resp.json();
//             }
//             throw new Error(`${resp.status} User id does not exist.`);
//           })
//           .then((res) => {
//             setImages(res.annotations);
//             setIsFetching(false);
//             setIsImagesFetched(true);
//           })
//           .catch((error) => {
//             console.error(error);
//           });
//       }
//     }
//   }, [userId, isFetching, isImagesFetched]);
//   return images;
// }

// export function useGetImageLink(imageId) {
//   const url = `${service_endpoints.image.get_image}/${imageId}`;
//   return url;
// }
