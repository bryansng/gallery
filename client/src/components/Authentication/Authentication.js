import React, { useState, useEffect } from "react";
import { service_endpoints } from "../../config/content.json";
const userEndpoints = service_endpoints.user;

function useAuthentication() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const userInitialState = {
    id: "",
    email: "",
    username: "",
    creationDate: "",
  };
  const [user, setUser] = useState(userInitialState);

  useEffect(() => {
    // open first time.
    // if (isAuthenticated) {
    //   logOut();
    // }
    if (!token && !isAuthenticated) {
      // signIn("test1@h1h111111o1.com", "test");
      // register("1hon1ey11", "1te11d@1113.com", "test");
    }

    // open after previously logged in.
    if (token && !user.id) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          token: `${token}`,
        }),
      };

      fetch(userEndpoints.get_by_token, requestOptions)
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error(
            `${resp.status} Unauthorized: Token expired. Requires another signin by user.`
          );
        })
        .then((res) => {
          setIsAuthenticated(true);
          setUser({ ...user, ...res.user });
          // ? atm token lifespan is long, what if its short and token expires?
          // ? user will need to login again.
        })
        .catch((error) => {
          console.error(error);
          logOut();
        });
    }
  });

  function logOut() {
    setToken("");
    window.localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(userInitialState);
    console.log("User logged out successfully.");
  }

  function register(username, email, password) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    };

    fetch(userEndpoints.register, requestOptions)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error(`${resp.status}: Username or email already exists.`);
      })
      .then((res) => {
        setToken(res.token);
        window.localStorage.setItem("token", res.token);
        setIsAuthenticated(true);
        setUser({ ...user, ...res.user });
        console.log("User registered in successfully.");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function signIn(email, password) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    fetch(userEndpoints.signin, requestOptions)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error(`${resp.status}: User Credentials incorrect.`);
      })
      .then((res) => {
        setToken(res.token);
        window.localStorage.setItem("token", res.token);
        setIsAuthenticated(true);
        setUser({ ...user, ...res.user });
        console.log("User signed in successfully.");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return {
    isAuthenticated,
    token,
    user,
    signIn,
    logOut,
    register,
    authComponent: (
      <div>
        token: {token}
        <br />
        id: {user.id}
        <br />
        email: {user.email}
        <br />
        username: {user.username}
        <br />
        isAuthenticated: {`${isAuthenticated}`}
        <br />
      </div>
    ),
  };
}

export default useAuthentication;
