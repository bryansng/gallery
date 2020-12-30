import { useState, useEffect } from "react";
import routes from "../../config/routes.json";

function useRouter() {
  const [route, setRoute] = useState(
    window.localStorage.getItem("route") === null
      ? routes.homepage
      : window.localStorage.getItem("route")
  );
  const [routeData, setRouteData] = useState(
    window.localStorage.getItem("routeData") === null
      ? {}
      : JSON.parse(window.localStorage.getItem("routeData"))
  );

  useEffect(() => {
    // console.log(Object.keys(routeData).length === 0);
    if (Object.keys(routeData).length === 0 && route !== routes.homepage) {
      updateRoute(routes.homepage);
      window.localStorage.removeItem("routeData");
    }
  });

  function updateRoute(newRoute) {
    window.localStorage.setItem("route", newRoute);
    setRoute(newRoute);
  }

  function updateRouteData(newRouteData) {
    window.localStorage.setItem("routeData", JSON.stringify(newRouteData));
    setRouteData(newRouteData);
  }

  return { route, routeData, updateRoute, updateRouteData };
}

export default useRouter;
