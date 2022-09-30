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
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { MainContext, MainContextType } from "../../App";

const drawerWidthMax = 240;
const drawerWidthMin = 80;

type PropTypes = {
  isActive?: boolean;
  fullWidth?: boolean;
};

const DrawerStyled = styled(Drawer)<PropTypes>`
  width: ${({ fullWidth }) =>
    fullWidth ? `${drawerWidthMax}px` : `${drawerWidthMin}px`};
  flex-shrink: 0;
  & .MuiDrawer-paper {
    width: ${({ fullWidth }) =>
      fullWidth ? `${drawerWidthMax}px` : `${drawerWidthMin}px`};
    border-right: none;
  }
`;

const Icon = styled(ListItemIcon)<PropTypes>`
  padding: 0 1rem;
  ${({ isActive }) => isActive && `& svg {fill: #202124;}`}
`;

const ListItemStyled = styled(ListItem)<PropTypes>`
  ${({ fullWidth }) => !fullWidth && `width: fit-content !important;`}
`;

const ListButton = styled(ListItemButton)<PropTypes>`
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
const ListItemTextStyled = styled(ListItemText)<PropTypes>`
  ${({ fullWidth }) =>
    !fullWidth && "display: none !important; margin-left: 15px;"}
  color: #202124;
`;

export default function Sidebar() {
  const { menuIsOpen, curPage, setCurPage } = useContext(MainContext);

  const menuItems: {
    text: MainContextType["curPage"];
    icon: React.ReactNode;
  }[] = [
    { text: "Заметки", icon: <LightbulbOutlinedIcon /> },
    { text: "Архив", icon: <ArchiveOutlinedIcon /> },
    { text: "Корзина", icon: <DeleteOutlineOutlinedIcon /> },
  ];

  return (
    <DrawerStyled variant="permanent" fullWidth={menuIsOpen} open={false}>
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map(({ text, icon }) => (
            <ListItemStyled fullWidth={menuIsOpen} key={text} disablePadding>
              <ListButton
                fullWidth={menuIsOpen}
                isActive={text === curPage}
                onClick={() => setCurPage(text)}
              >
                <Icon
                  color={text === curPage ? "black" : ""}
                  isActive={text === curPage}
                  sx={{
                    ...(menuIsOpen ? {} : { padding: 0, minWidth: "auto" }),
                  }}
                >
                  {icon}
                </Icon>
                <ListItemTextStyled
                  primaryTypographyProps={{ fontSize: "14px" }}
                  primary={text}
                  fullWidth={menuIsOpen}
                />
              </ListButton>
            </ListItemStyled>
          ))}
        </List>
      </Box>
    </DrawerStyled>
  );
}
