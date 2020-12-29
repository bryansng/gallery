import React, { useState, useEffect } from "react";
import { service_endpoints } from "../../config/content.json";
const userEndpoints = service_endpoints.user;

const leToken =
  "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ1Yi1aN0hleDctSy1fQTh2U3ZUX0JINFdPM2ItRy02RFdWdDdJcGFXRzFFIn0.eyJleHAiOjE2MTAxMjI3NjgsImlhdCI6MTYwOTI1ODc2OCwianRpIjoiNjMyOWE5N2QtMTI0OC00M2Q1LTk2ZWYtYmJiN2YyYTFhYTgyIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDkwL2F1dGgvcmVhbG1zL2dhbGxlcnkiLCJzdWIiOiI4MzYxMWUyOS1hMjZkLTRmZGYtYTNjYi0yYjkxMjI4ZWJlYzEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJsb2dpbi1hcHAiLCJzZXNzaW9uX3N0YXRlIjoiZTY4NmUyYjEtNDBiOC00NzUxLTk0ZDQtYTBiMmY2OTRlYTY1IiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QxQGgxaDExMTExMW8xLmNvbSIsImVtYWlsIjoidGVzdDFAaDFoMTExMTExbzEuY29tIn0.e6-xUsBA9-H3xJaXKCK7PYCEZ5sA0uheixB0VaEpjxjhHxZiLLAK4Ejj1YmQaUmJXs1-FtMD5iWpiGoX43efR3GExlrPwvR3qNtFk_2dpSxZoLzBhYbI-r6L_xaoTxkK5Uq6iEdop4Q7ZgVb51nrXnDP9shd4V_i7qF8ZELF6xJemOcRAXb05qID7bMW4G8FW7T46V3MRxHISfuADWTkd93Gx9Y0VvjgxIIC87vWfM0jZvc9pyzHD1xq1GtTNbkADi6WBT00hPAp6Df-iupQW9NFsAcnc5foFr3oFlTWaBx9gIAIIl4bAc4NYHkaVJV8_jOI-OpSBN3V9N-N-FsRig";

const loggedIn = false;

function Authentication(props) {
  // window.localStorage.removeItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [token, setToken] = useState(loggedIn ? leToken : "");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const userInitialState = {
    id: "",
    email: "",
    username: "",
    creationDate: "",
  };
  const [user, setUser] = useState(userInitialState);

  // function takes in

  // if not authed, show signin or register.
  // else, show user profile button.

  // App.js handles auth and tokening.
  // passes token and user object to other components.
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

export default Authentication;
