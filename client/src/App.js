import React, { useState, useEffect } from "react";
import Profile from "./components/Profile/Profile.js";
import Navigation from "./components/Navigation/Navigation";
import Authentication from "./components/Authentication/Authentication";
import Home from "./components/Home/Home.js";
import routes from "./config/routes";

function Image(props) {
  const { routeData } = props;
  return <div>Image Id: {routeData.imageId}</div>;
}

export default function App() {
  const {
    isAuthenticated,
    token,
    user,
    signIn,
    logOut,
    register,
    authComponent,
  } = Authentication();

  useEffect(() => {
    // if (isAuthenticated) {
    //   logOut();
    // }
  });

  const [route, setRoute] = useState(routes.homepage);
  const [routeData, setRouteData] = useState({});

  const components = {};
  components[routes.homepage] = (
    <Home setRoute={setRoute} setRouteData={setRouteData} />
  );
  components[routes.view_image] = (
    <Image
      routeData={routeData}
      setRoute={setRoute}
      setRouteData={setRouteData}
    />
  );

  return (
    <div>
      {/* Hello, this is the root level */}
      <Navigation />
      {/* {authComponent} */}
      {components[route]}
      {/* <Home />
      <Image /> */}
      {/* <Profile /> */}
    </div>
  );
}
