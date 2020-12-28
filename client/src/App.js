import React, { useState } from "react";
import Search from "./components/Search/Search.js";
import Profile from "./components/Profile/Profile.js";
import Navigation from "./components/Navigation/Navigation.js";
import Body from "./components/Body/Body.js";

export default function App() {
  const [isSearch, setIsSearch] = useState(false);
  const [searchEndpoint, setSearchEndpoint] = useState("");
  return (
    <div>
      <Navigation
        setIsSearch={setIsSearch}
        setSearchEndpoint={setSearchEndpoint}
      />
      <Body isSearch={isSearch} searchEndpoint={searchEndpoint} />
    </div>
  );
}
