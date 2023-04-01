import { LOGIN_URL } from "@router/router";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return localStorage.getItem("RS_TOKEN") ? (
    <>{children}</>
  ) : (
    <Navigate to={LOGIN_URL} />
  );
};

export default PrivateRoute;
