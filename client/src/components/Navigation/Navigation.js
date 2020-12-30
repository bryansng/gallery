import React from "react";
import styled from "styled-components";
import Logo from "./Logo.js";
import Search from "./Search.js";
import Upload from "./Upload.js";
import Account from "./Account.js";

const Container = styled.div.attrs({
  className: `center w-75-l w-80 flex flex-wrap flex-row justify-between items-center mt3 mb3`,
})``;

function Navigation(props) {
  const { setRoute } = props;

  return (
    <Container>
      <Logo setRoute={setRoute} />
      <Search />
      <Upload {...props} />
      <Account />
    </Container>
  );
}

export default Navigation;
