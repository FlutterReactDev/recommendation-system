import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import MenuIcon from "@mui/icons-material/Menu";
export interface PageProps {
  title: string;
  handleDrawerToggle: () => void;
}
const Page: FC<PropsWithChildren<PageProps>> = (props) => {
  const { title, handleDrawerToggle, children } = props;
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
      }}
    >
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>

      {children}
    </Box>
  );
};

export default Page;
