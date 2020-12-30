import React, { useState, useEffect } from "react";
import Profile from "./components/Profile/Profile.js";
import Navigation from "./components/Navigation/Navigation";
import useAuthentication from "./components/Authentication/Authentication";
import useRouter from "./components/Router/Router";
import Home from "./components/Home/Home.js";
import ViewImage from "./components/Image/Image.js";
import Search from "./components/Search/Search.js";
import routes from "./config/routes";

export default function App() {
  const [isSearch, setIsSearch] = useState(false);
  const [searchEndpoint, setSearchEndpoint] = useState("");

  const {
    isAuthenticated,
    token,
    user,
    signIn,
    logOut,
    register,
    authComponent,
  } = useAuthentication();

  const { route, routeData, updateRoute, updateRouteData } = useRouter();

  useEffect(() => {
    // if (isAuthenticated) {
    //   logOut();
    // }
  });

  const components = {};
  components[routes.homepage] = (
    <Home setRoute={updateRoute} setRouteData={updateRouteData} />
  );
  components[routes.view_image] = (
    <ViewImage
      routeData={routeData}
      setRoute={updateRoute}
      setRouteData={updateRouteData}
    />
  );
  components[routes.searchPage] = (
    <Search
      isSearch={isSearch}
      searchEndpoint={searchEndpoint}
      setRoute={updateRoute}
      setRouteData={updateRouteData}
      routeData={routeData}
    />
  );

  return (
    <div>
      {/* Hello, this is the root level */}
      <Navigation
        token={token}
        user={user}
        setRoute={updateRoute}
        setRouteData={updateRouteData}
        setIsSearch={setIsSearch}
        setSearchEndpoint={setSearchEndpoint}
      />
      {authComponent}
      {components[route]}
      {/* <Home />
      <ViewImage /> */}
      {/* <Profile /> */}
    </div>
  );
}
