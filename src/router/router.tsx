import {
  LoginPage,
  RecipesCreatePage,
  RecipesPage,
  RegisterPage,
  ResetPage,
} from "@pages";
import App from "../App";
import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

export const HOME_URL = "/";
export const LOGIN_URL = "/login";
export const REGISTER_URL = "/register";
export const RESET_URL = "/reset";
export const RECIPES_URL = "/recipes";
export const RECIPES_CREATE_URL = "/recipes-create";
export const FAVORITE_URL = "/favorite";
const ROUTES = [
  {
    path: HOME_URL,
    element: <Navigate to={RECIPES_URL} />,
  },
  {
    path: RECIPES_URL,
    element: <RecipesPage />,
    type: "private",
  },
  {
    path: RECIPES_CREATE_URL,
    element: <RecipesCreatePage />,
    type: "private",
  },
];

const routes: RouteObject[] = [
  {
    path: HOME_URL,
    element: <App />,
    children: ROUTES.map(({ path, element, type }) => {
      return {
        path,
        element:
          type == "private" ? <PrivateRoute>{element}</PrivateRoute> : element,
      };
    }),
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
