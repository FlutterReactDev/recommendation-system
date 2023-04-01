import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Frame } from "@components";
import { FC } from "react";
import { Outlet } from "react-router-dom";

const App: FC = () => {
  const navigation = (
    <List>
      {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemText primary={text} />
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
