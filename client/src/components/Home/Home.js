import React from "react";
// import Container from "react-bootstrap/Container";
import styled from "styled-components";
import "tachyons";
import ImageCarousel from "./ImageCarousel";
import RecentAnnotations from "./RecentAnnotations";
// import Navigation from "./components/Navigation/Navigation.js";

const Container = styled.div.attrs({
  className: `center w-60-l w-70 mt3`,
})``;

function Home(props) {
  return (
    <Container>
      <ImageCarousel {...props} />
      <RecentAnnotations {...props} />
    </Container>
  );
}

export default Home;
