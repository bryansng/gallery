import React from "react";
import styled from "styled-components";
import Logo from "./Logo.js";
import Search from "./Search.js";
import Upload from "./Upload.js";
import Account from "./Account.js";

const Container = styled.div.attrs({
  className: `center w-75-l w-80 flex flex-wrap flex-row justify-between items-center mt3 mb3`,
})``;

function Navigation({
  token,
  user,
  signIn,
  register,
  logOut,
  isAuthenticated,
  setRoute,
  setRouteData,
}) {
  return (
    <Container>
      <Logo setRoute={setRoute} />
      <Search setRoute={setRoute} setRouteData={setRouteData} />
      <Upload setRoute={setRoute} setRouteData={setRouteData} user={user} />
      <Account
        signIn={signIn}
        register={register}
        logOut={logOut}
        isAuthenticated={isAuthenticated}
      />
    </Container>
  );
}

export default Navigation;
