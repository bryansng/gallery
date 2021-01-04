import React from "react";
import Profile from "./components/Profile/Profile.js";
import Navigation from "./components/Navigation/Navigation";
import useAuthentication from "./components/Authentication/Authentication";
import useRouter from "./components/Router/Router";
import Home from "./components/Home/Home.js";
import ViewImage from "./components/Image/Image.js";
import Search from "./components/Search/Search.js";
import routes from "./config/routes";

export default function App() {
  const {
    isAuthenticated,
    token,
    user,
    signIn,
    logOut,
    register,
    // authComponent,
  } = useAuthentication();

  const { route, routeData, updateRoute, updateRouteData } = useRouter();

  const components = {};
  components[routes.view_user_profile] = (
    <Profile
      token={token}
      currentSignedInUser={user}
      routeData={routeData}
      setRoute={updateRoute}
      setRouteData={updateRouteData}
    />
  );
  components[routes.homepage] = (
    <Home
      isAuthenticated={isAuthenticated}
      token={token}
      user={user}
      setRoute={updateRoute}
      setRouteData={updateRouteData}
    />
  );
  components[routes.view_image] = (
    <ViewImage
      isAuthenticated={isAuthenticated}
      token={token}
      user={user}
      routeData={routeData}
      setRoute={updateRoute}
      setRouteData={updateRouteData}
    />
  );
  components[routes.search_keyword] = (
    <Search
      routeData={routeData}
      setRoute={updateRoute}
      setRouteData={updateRouteData}
    />
  );

  return (
    <div>
      <Navigation
        token={token}
        user={user}
        signIn={signIn}
        register={register}
        logOut={logOut}
        isAuthenticated={isAuthenticated}
        setRoute={updateRoute}
        setRouteData={updateRouteData}
      />
      {/* {authComponent} */}
      {components[route]}
    </div>
  );
}
