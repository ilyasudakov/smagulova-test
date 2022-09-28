import styled from "styled-components";

import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";

const drawerWidth = 240;

const DrawerStyled = styled(Drawer)`
  width: ${drawerWidth}px;
  flex-shrink: 0;
  & .MuiDrawer-paper {
    width: ${drawerWidth}px;
  }
`;

export default function Sidebar() {
  return (
    <DrawerStyled variant="permanent" open={true}>
      <Toolbar />
      123
    </DrawerStyled>
  );
}
