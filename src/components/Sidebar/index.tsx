import styled from "styled-components";

import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";

const drawerWidth = 240;

const DrawerStyled = styled(Drawer)`
  width: ${drawerWidth}px;
  flex-shrink: 0;
  & .MuiDrawer-paper {
    width: ${drawerWidth}px;
    border-right: none;
  }
`;

const Icon = styled(ListItemIcon)`
  padding: 0 1rem;
`;

const ListItemStyled = styled(ListItem)``;

const ListButton = styled(ListItemButton)<{ isActive: boolean }>`
  background-color: ${({ isActive }) =>
    isActive ? "#feefc3" : "#fff"} !important;
  border-radius: 0 25px 25px 0 !important;
`;

export default function Sidebar() {
  return (
    <DrawerStyled variant="permanent" open={true}>
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {["Заметки", "Архив", "Корзина"].map((text, index) => (
            <ListItemStyled key={text} disablePadding>
              <ListButton isActive={index === 0}>
                <Icon>
                  <LightbulbOutlinedIcon />
                </Icon>
                <ListItemText
                  primaryTypographyProps={{ fontSize: "14px" }}
                  primary={text}
                />
              </ListButton>
            </ListItemStyled>
          ))}
        </List>
      </Box>
    </DrawerStyled>
  );
}
