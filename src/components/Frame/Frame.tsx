import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import { createContext, useState } from "react";

export interface FrameProps {
  navigation?: React.ReactNode;
}
export interface FrameContextProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

export const FrameContext = createContext<FrameContextProps>({
  mobileOpen: false,
  handleDrawerToggle: () => {},
});

const Frame: React.FC<React.PropsWithChildren<FrameProps>> = (props) => {
  const { navigation, children } = props;
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <FrameContext.Provider
      value={{
        mobileOpen,
        handleDrawerToggle,
      }}
    >
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
    </FrameContext.Provider>
  );
};

export default Frame;
