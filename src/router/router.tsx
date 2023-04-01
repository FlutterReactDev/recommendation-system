import { LoginPage, RegisterPage, ResetPage } from "@pages";
import App from "../App";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

export const HOME_URL = "/";
export const LOGIN_URL = "/login";
export const REGISTER_URL = "/register";
export const RESET_URL = "/reset";

const routes: RouteObject[] = [
  {
    path: HOME_URL,
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
  },
  {
    path: LOGIN_URL,
    element: <LoginPage />,
  },
  {
    path: REGISTER_URL,
    element: <RegisterPage />,
  },
  {
    path: RESET_URL,
    element: <ResetPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;