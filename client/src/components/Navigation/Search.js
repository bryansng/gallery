import React, { useState } from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import { ReactComponent as MagnifyingGlass } from "../../assets/svgs/search.svg";
import useFetch from "react-fetch-hook";

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
  top: 15%;
  left: 0.5rem;
  /* transform: translate(-50%, -50%); */
  fill: gray;
`;
const SearchInput = styled(Form.Control).attrs({
  className: ``,
})`
  padding-left: 2.5rem;
`;

const SearchIcon = styled(MagnifyingGlass).attrs({
  className: ``,
})`
  height: 1.6rem;
  object-fit: contain;
`;

function Search({ keyword, setKeyword, setIsSearch, setSearchEndpoint }) {
  const [search, setSearch] = useState("");

  console.log("search: " + search);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchEndpoint(search);
    setIsSearch(true);
  };

  const handleChange = (event) => {
    var str = event.target.value;
    if (str.length === 0) {
      setIsSearch(false);
    }
    setSearch(str);
  };

  return (
    <SearchForm onSubmit={handleSubmit}>
      <SearchFormGroup controlId="Search">
        <SearchInput
          onChange={handleChange}
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
