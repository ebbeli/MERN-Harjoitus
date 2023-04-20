import { Route, RouteProps } from "react-router-dom";
import Login from "./components/Login.js";
import useToken from "./components/elements/useToken";
import React from "react";

const PrivateRoute = (children) => {
  const isAuthenticated = checkCookie();
  if (isAuthenticated == true) {
    return children;
  }

  return children;
};

function checkCookie() {
  return true;
}

export default PrivateRoute;
