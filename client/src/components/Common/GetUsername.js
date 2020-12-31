import { useState, useEffect } from "react";
import { service_endpoints } from "../../config/content.json";

export function GetUsername({ userId }) {
  const [isFetching, setIsFetching] = useState(false);
  const [isUserFetched, setIsUserFetched] = useState(false);
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (!isFetching) {
      if (userId && !isUserFetched) {
        setIsFetching(true);
        fetch(`${service_endpoints.user.username}/${userId}`)
          .then((resp) => resp.json())
          .then((res) => {
            setUsername(res.user.username);
            setIsFetching(false);
            setIsUserFetched(true);
            console.log(res.user);
          });
      }
    }
  }, [userId, isFetching, isUserFetched]);
  return username;
}
