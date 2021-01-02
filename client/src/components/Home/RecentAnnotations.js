import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AnnotationCard from "./AnnotationCard";
import CardDeck from "react-bootstrap/CardDeck";
import content from "../../config/content.json";

const Container = styled.div.attrs({
  className: `center mt5 mb5 flex flex-wrap justify-center items-stretch`,
})``;

const Title = styled.h2.attrs({
  className: `mt2 mb5 avenir fw6 f2 dark-gray w-100`,
})``;

const CustomCardDeck = styled.div.attrs({
  className: ``,
})``;

function RecentAnnotations({
  isAuthenticated,
  token,
  user,
  setRoute,
  setRouteData,
}) {
  const [isFetching, setIsFetching] = useState(false);
  const [annotations, setAnnotations] = useState([]);

  useEffect(() => {
    if (!isFetching && annotations.length === 0) {
      setIsFetching(true);
      fetch(`${content.service_endpoints.annotation.recent}/6`)
        .then((resp) => resp.json())
        .then((res) => {
          setAnnotations(res.annotations);
          setIsFetching(false);
        });
    }
  }, [isFetching, annotations]);

  return (
    <Container>
      <Title>Recent Annotations</Title>
      {annotations.map((annotation, index) => (
        <AnnotationCard
          isAuthenticated={isAuthenticated}
          token={token}
          user={user}
          originalAnnotation={annotation}
          setRoute={setRoute}
          setRouteData={setRouteData}
          key={index}
          extraClassName="w-40-l pointer"
        />
      ))}
    </Container>
  );
}

export default RecentAnnotations;
