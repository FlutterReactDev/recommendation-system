import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";

export interface FrameProps {
  navigation?: React.ReactNode;
}

const Frame: React.FC<React.PropsWithChildren<FrameProps>> = (props) => {
  const { navigation, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const drawerWidth = 240;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box component="nav" aria-label="mailbox folders">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {navigation}
        </Drawer>
      </Box>
      {children}
    </Box>
  );
};

export default Frame;
