import React from "react";
import styled from "styled-components";
import "tachyons";
import ImageCarousel from "./ImageCarousel";
import RecentAnnotations from "./RecentAnnotations";

const Container = styled.div.attrs({
  className: `center w-60-l w-70 mt3`,
})``;

function Home({ isAuthenticated, token, user, setRoute, setRouteData }) {
  return (
    <Container>
      <ImageCarousel setRoute={setRoute} setRouteData={setRouteData} />
      <RecentAnnotations
        isAuthenticated={isAuthenticated}
        token={token}
        user={user}
        setRoute={setRoute}
        setRouteData={setRouteData}
      />
    </Container>
  );
}

export default Home;
