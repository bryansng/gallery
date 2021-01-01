import React from "react";
import styled from "styled-components";
import routes from "../../config/routes";

const GalleryLogo = styled.h1.attrs({
  className: `avenir fw6 ma0`,
})``;

const Link = styled.a.attrs({
  className: `pointer near-black dim`,
})`
  text-decoration: none;
  :hover {
    text-decoration: none;
    color: #111;
  }
`;
function Logo(props) {
  const { setRoute } = props;
  return (
    <Link
      onClick={(e) => {
        e.preventDefault();
        setRoute(routes.homepage);
      }}
    >
      <GalleryLogo>Gallery.</GalleryLogo>
    </Link>
  );
}
export default Logo;
