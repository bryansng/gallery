import React from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import { ReactComponent as MagnifyingGlass } from "../../assets/svgs/search.svg";
import routes from "../../config/routes";

const SearchForm = styled(Form).attrs({
  className: `w-50 mw-10 ma0`,
})`
  position: relative;
  min-width: 400px;
`;

const SearchFormGroup = styled(Form.Group).attrs({
  className: `ma0 pa0`,
})`
  margin-bottom: 0;
`;

const SearchButton = styled.button.attrs({
  className: `bn bg-transparent b--transparent pa0 ma0`,
})`
  position: absolute;
  top: 50%;
  left: 1.3rem;
  transform: translate(-50%, -50%);
  fill: gray;
`;
const SearchInput = styled(Form.Control).attrs({
  className: ``,
})`
  padding-left: 2.2rem;
`;

const SearchIcon = styled(MagnifyingGlass).attrs({
  className: ``,
})`
  height: 1.6rem;
  object-fit: contain;
`;

function Search({ keyword, setKeyword, setRoute, setRouteData }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const searchKeyword = e.target.search.value;
    if (searchKeyword !== "") {
      setRouteData(searchKeyword);
      setRoute(routes.search_keyword);
      console.log("Going to search page.");
    }
  };

  return (
    <SearchForm onSubmit={handleSubmit}>
      <SearchFormGroup controlId="search">
        <SearchInput
          label="Search"
          aria-label="search"
          type="search"
          value={keyword}
          placeholder="Search"
        />
        <SearchButton type="submit">
          <SearchIcon />
        </SearchButton>
      </SearchFormGroup>
    </SearchForm>
  );
}

export default Search;
