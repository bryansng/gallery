import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AnnotationCard from "./AnnotationCard";
import CardDeck from "react-bootstrap/CardDeck";
import content from "../../config/content.json";
import routes from "../../config/routes";
import { GetUsername } from "../Common/GetUsername.js";

const Container = styled.div.attrs({
  className: `center mt5 mb5 flex flex-wrap justify-center items-stretch`,
})``;

const Title = styled.h2.attrs({
  className: `mt2 mb5 avenir fw6 f2 dark-gray w-100`,
})``;

const CustomCardDeck = styled.div.attrs({
  className: ``,
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
      <Title>Recent Annotations</Title>
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
          extraClassName="w-40-l pointer"
        />
      ))}
    </Container>
  );
}

export default RecentAnnotations;
