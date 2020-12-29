import React, { useState, useEffect } from "react";
import Profile from "./components/Profile/Profile.js";
import Navigation from "./components/Navigation/Navigation";
import Authentication from "./components/Authentication/Authentication";

export default function App() {
  const {
    isAuthenticated,
    token,
    user,
    signIn,
    logOut,
    register,
    authComponent,
  } = Authentication();

  useEffect(() => {
    // if (isAuthenticated) {
    //   logOut();
    // }
  });

  return (
    <div>
      {/* Hello, this is the root level */}
      <Navigation />
      {/* add router here */}
      {authComponent}
    </div>
  );
}
