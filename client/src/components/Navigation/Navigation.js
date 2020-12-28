import React, { useState } from "react";
import styled from "styled-components";
import Logo from "./Logo.js";
import Search from "./Search.js";
import Upload from "./Upload.js";
import Account from "./Account.js";

const Container = styled.div.attrs({
  className: `center w-75-l w-80 flex flex-wrap flex-row justify-between items-center`,
})``;

function Navigation({ setIsSearch, setSearchEndpoint }) {
  return (
    <Container className="mt3">
      <Logo />
      <Search setIsSearch={setIsSearch} setSearchEndpoint={setSearchEndpoint} />
      <Upload />
      <Account />
    </Container>
  );
}

export default Navigation;
