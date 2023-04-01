import { LOGIN_URL } from "@router/router";
import { FC, PropsWithChildren } from "react";
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
