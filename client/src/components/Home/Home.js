import React from "react";
import styled from "styled-components";
import "tachyons";
import ImageCarousel from "./ImageCarousel";
import RecentAnnotations from "./RecentAnnotations";

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
