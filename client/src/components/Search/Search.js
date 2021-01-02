import React from "react";
import styled from "styled-components";
import useFetch from "react-fetch-hook";
import content from "../../config/content.json";
import ProfileCard from "../Common/ProfileCard";
import ImageHoverSquare from "../Profile/ImageHoverSquare";
import placeholderImage from "../../assets/images/placeholder.png";
const searchEndpoints = content.service_endpoints.search;

// const Headers = styled.p.attrs(() => ({
//   className: `f2 fw3 avenir `,
// }))``;

// const UserContainer = styled.div.attrs(() => ({
//   className: `grow dim pointer`,
// }))``;

// const Username = styled.p.attrs(() => ({
//   className: `avenir pt1 f3 fw3 my-auto`,
// }))``;

// const Hover = styled.div.attrs(() => ({
//   className: `d-flex flex-column justify-content-center align-items-center my-auto`,
// }))``;

// const HoverContent = styled.div.attrs(() => ({
//   className: `text-white my-auto`,
// }))``;

const Container = styled.div.attrs({
  className: `center mt5 mb5 w-60-l w-70 flex flex-wrap`,
})``;

const Title = styled.h2.attrs({
  className: `mv2 avenir fw6 f2 dark-gray w-100`,
})``;

const SectionTitle = styled.h3.attrs({
  className: `mv2 avenir fw5 dark-gray w-100`,
})``;

function Search({ routeData, setRoute, setRouteData }) {
  const searchKeyword = routeData;
  const { isLoading, data } = useFetch(
    `${searchEndpoints.search}/${searchKeyword}`
  );

  return (
    <Container>
      <Title>Search results for: {searchKeyword}</Title>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          {!isLoading &&
          data.imageResponse.imagesByTitle.totalHits === 0 &&
          data.imageResponse.imagesByDescription.totalHits === 0 &&
          data.userResponse.users.totalHits === 0
            ? "No results found, please try other keywords."
            : ""}
        </>
      )}
      {!isLoading && data.imageResponse.imagesByTitle.totalHits > 0 ? (
        <>
          <SectionTitle>Images by title</SectionTitle>
          {data.imageResponse.imagesByTitle.searchHits.map((image, index) => (
            <ImageHoverSquare
              key={index}
              image={image}
              setRoute={setRoute}
              setRouteData={setRouteData}
              showUsername
            />
          ))}
        </>
      ) : (
        ""
      )}

      {!isLoading && data.imageResponse.imagesByDescription.totalHits > 0 ? (
        <>
          <SectionTitle>Images by description</SectionTitle>
          {data.imageResponse.imagesByDescription.searchHits.map(
            (image, index) => (
              <ImageHoverSquare
                key={index}
                image={image}
                setRoute={setRoute}
                setRouteData={setRouteData}
                showUsername
              />
            )
          )}
        </>
      ) : (
        ""
      )}

      {!isLoading && data.userResponse.users.totalHits > 0 ? (
        <>
          <SectionTitle>Users</SectionTitle>
          {data.userResponse.users.searchHits.map((userSearched, index) => (
            <ProfileCard
              key={index}
              userId={userSearched.id}
              extraClassName={"pointer"}
              scaleSize={0.8}
              setRoute={setRoute}
              setRouteData={setRouteData}
            />
          ))}
        </>
      ) : (
        ""
      )}
    </Container>
  );
}

export default Search;
