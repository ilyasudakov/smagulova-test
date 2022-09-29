import { useContext } from "react";
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

import { MainContext } from "../../App";

const drawerWidthMax = 240;
const drawerWidthMin = 80;

const DrawerStyled = styled(Drawer)<{
  fullWidth: boolean;
}>`
  width: ${({ fullWidth }) =>
    fullWidth ? `${drawerWidthMax}px` : `${drawerWidthMin}px`};
  flex-shrink: 0;
  & .MuiDrawer-paper {
    width: ${({ fullWidth }) =>
      fullWidth ? `${drawerWidthMax}px` : `${drawerWidthMin}px`};
    border-right: none;
  }
`;

const Icon = styled(ListItemIcon)<{ isActive: boolean }>`
  padding: 0 1rem;
  ${({ isActive }) => isActive && `color: black;`}
`;

const ListItemStyled = styled(ListItem)<{
  fullWidth: boolean;
}>`
  ${({ fullWidth }) => !fullWidth && `width: fit-content !important;`}
`;

const ListButton = styled(ListItemButton)<{
  isActive: boolean;
  fullWidth: boolean;
}>`
  background-color: ${({ isActive }) =>
    isActive ? "#feefc3" : "#fff"} !important;
  border-radius: 0 25px 25px 0 !important;
  height: 48px;
  ${({ fullWidth }) =>
    !fullWidth &&
    `& {
    max-width: fit-content;
    border-radius: 25px !important;
    margin-left: 12px !important;
    padding: 8px 12px !important;
    }`};
`;

export default function Sidebar() {
  const { menuIsOpen } = useContext(MainContext);

  return (
    <DrawerStyled variant="permanent" fullWidth={menuIsOpen} open={false}>
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {["Заметки", "Архив", "Корзина"].map((text, index) => (
            <ListItemStyled fullWidth={menuIsOpen} key={text} disablePadding>
              <ListButton fullWidth={menuIsOpen} isActive={index === 0}>
                <Icon
                  color={index === 0 ? "black" : ""}
                  isActive={index === 0}
                  sx={{
                    ...(menuIsOpen ? {} : { padding: 0, minWidth: "auto" }),
                  }}
                >
                  <LightbulbOutlinedIcon />
                </Icon>
                <ListItemText
                  primaryTypographyProps={{ fontSize: "14px" }}
                  primary={text}
                  sx={{
                    ...(menuIsOpen ? {} : { display: "none" }),
                  }}
                />
              </ListButton>
            </ListItemStyled>
          ))}
        </List>
      </Box>
    </DrawerStyled>
  );
}
