import { LOGIN_URL, TAGS_URL } from "@router/router";
import AuthService from "@service/auth";
import { FC, PropsWithChildren } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { container } from "tsyringe";

const PrivateRoute: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const authService = container.resolve(AuthService);
  if (localStorage.getItem("RS_TOKEN")) {
    return <>{children}</>;
  } else {
    return <Navigate to={LOGIN_URL} />;
  }
};

export default PrivateRoute;
