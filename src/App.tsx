import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";

import { Frame } from "@components";
import { FC } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ROUTES } from "@router/router";

const App: FC = () => {
  const navigation = (
    <List>
      {ROUTES.map(({ label, icon, path }) => (
        <ListItem key={label} disablePadding>
          <ListItemButton component={NavLink} to={path}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
  return (
    <Frame navigation={navigation}>
      <Outlet />
    </Frame>
  );
};

export default App;
