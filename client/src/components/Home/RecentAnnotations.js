import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AnnotationCard from "./AnnotationCard";
import CardDeck from "react-bootstrap/CardDeck";
import content from "../../config/content.json";
import routes from "../../config/routes";
import { GetUsername } from "../Common/GetUsername.js";

const Container = styled.div.attrs({
  className: `center mt5 mb5`,
})``;

const Title = styled.h2.attrs({
  className: `mt2 mb5 avenir fw6 f2 dark-gray`,
})``;

const CustomCardDeck = styled(CardDeck).attrs({
  className: `flex flex-wrap items-stretch`,
})``;

function RecentAnnotations(props) {
  const { setRoute, setRouteData } = props;
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
          console.log(res);
        });
    }
  }, [isFetching, annotations]);

  return (
    <Container>
      <Title>Recent Annoations</Title>
      <CustomCardDeck>
        {annotations.map((annotation, index) => (
          <AnnotationCard
            username={<GetUsername userId={annotation.userId} />}
            creationDate={annotation.creationDate}
            content={annotation.content}
            totalVotes={annotation.totalVotes}
            onClick={() => {
              setRouteData(annotation.imageId);
              setRoute(routes.view_image);
              console.log("CLICKED ANNOTATION GOING TO IMAGE NOW");
            }}
            key={index}
          />
        ))}
      </CustomCardDeck>
    </Container>
  );
}

export default RecentAnnotations;
