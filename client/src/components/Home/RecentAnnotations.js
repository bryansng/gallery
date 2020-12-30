import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AnnotationCard from "./AnnotationCard";
import CardDeck from "react-bootstrap/CardDeck";
import content from "../../config/content.json";

const Container = styled.div.attrs({
  className: `center mt5 mb5`,
})``;

const Title = styled.h2.attrs({
  className: `mt2 mb5 avenir fw6 f2 dark-gray`,
})``;

const CustomCardDeck = styled(CardDeck).attrs({
  className: `flex flex-wrap items-stretch`,
})``;

function GetUsername(props) {
  const { userId } = props;
  const [name, setUsername] = useState("");
  useEffect(() => {
    fetch(`${content.service_endpoints.user.username}/${userId}`)
      .then((resp) => resp.json())
      .then((res) => {
        setUsername(res.user.username);
      });
  });
  return name;
}

function RecentAnnotations(props) {
  const [annotations, setAnnotations] = useState([]);

  useEffect(() => {
    const url = `${content.service_endpoints.annotation.recent}/6`;
    console.log(url);
    if (annotations.length === 0) {
      fetch(url)
        .then((resp) => resp.json())
        .then((res) => {
          setAnnotations(res.annotations);
          console.log(res);
        });
    }
  });

  return (
    <Container>
      <Title></Title>
      <CustomCardDeck>
        {annotations.map((annotation) => (
          <AnnotationCard
            username={<GetUsername userId={annotation.userId} />}
            creationDate={annotation.creationDate}
            content={annotation.content}
            totalVotes={annotation.totalVotes}
            imageId={annotation.imageId}
            {...props}
          />
        ))}
      </CustomCardDeck>
    </Container>
  );
}

export default RecentAnnotations;
