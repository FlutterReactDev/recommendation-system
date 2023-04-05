import {
  FavoritePage,
  HomePage,
  LoginPage,
  RecipesCreatePage,
  RecipesPage,
  RegisterPage,
  ResetPage,
  TagsPage,
} from "@pages";
import App from "../App";
import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import HomeIcon from "@mui/icons-material/Home";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import RestaurantIcon from "@mui/icons-material/Restaurant";

export const MAIN_URL = "/home";
export const HOME_URL = "/";
export const LOGIN_URL = "/login";
export const REGISTER_URL = "/register";
export const RESET_URL = "/reset";
export const RECIPES_URL = "/recipes";
export const RECIPES_CREATE_URL = "/recipes-create";
export const FAVORITE_URL = "/favorite";
export const TAGS_URL = "/tags";

export enum PageType {
  PRIVATE = "private",
}

export const ROUTES = [
  {
    path: HOME_URL,
    element: <Navigate to={MAIN_URL} />,
  },
  {
    path: MAIN_URL,
    element: <HomePage />,
    type: PageType.PRIVATE,
    icon: <HomeIcon />,
    label: "Home",
  },
  {
    path: RECIPES_URL,
    element: <RecipesPage />,
    type: PageType.PRIVATE,
    icon: <RestaurantIcon />,
    label: "Recipes",
  },
  {
    path: RECIPES_CREATE_URL,
    element: <RecipesCreatePage />,
    type: PageType.PRIVATE,
    icon: <FastfoodIcon />,
    label: "Add Your Recipes",
  },
  {
    path: FAVORITE_URL,
    element: <FavoritePage />,
    type: PageType.PRIVATE,
    icon: <ThumbUpIcon />,
    label: "Favorite",
  },
];

export const routes: RouteObject[] = [
  {
    path: HOME_URL,
    element: <App />,
    children: ROUTES.map(({ path, element, type }) => {
      return {
        path,
        element:
          type == PageType.PRIVATE ? (
            <PrivateRoute>{element}</PrivateRoute>
          ) : (
            element
          ),
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
  {
    path: TAGS_URL,
    element: <TagsPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;
