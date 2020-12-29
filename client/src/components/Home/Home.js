import React from "react";
// import Container from "react-bootstrap/Container";
import styled from "styled-components";
import "tachyons";
import ImageCarousel from "./ImageCarousel";
// import Navigation from "./components/Navigation/Navigation.js";

const Container = styled.div.attrs({
  className: `center w-75-l w-80 `,
})``;

function Home(props) {
  return (
    <Container>
      <ImageCarousel {...props} />
    </Container>
  );
}

export default Home;
