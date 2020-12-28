import React from "react";
import Search from "../Search/Search.js";

export default function Body({ isSearch, searchEndpoint }) {
  return (
    <div>
      {isSearch ? <Search searchEndpoint={searchEndpoint} /> : <p>poo</p>}
    </div>
  );
}
