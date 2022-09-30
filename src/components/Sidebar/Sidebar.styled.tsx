import styled from "styled-components";

import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const drawerWidthMax = 240;
const drawerWidthMin = 80;

type PropTypes = {
  isActive?: boolean;
  fullWidth?: boolean;
};

export const DrawerStyled = styled(Drawer)<PropTypes>`
  width: ${({ fullWidth }) =>
    fullWidth ? `${drawerWidthMax}px` : `${drawerWidthMin}px`};
  flex-shrink: 0;
  z-index: 10;

  & .MuiDrawer-paper {
    width: ${({ fullWidth }) =>
      fullWidth ? `${drawerWidthMax}px` : `${drawerWidthMin}px`};
    border-right: none;
  }

  @media (max-width: 768px) {
    background-color: #fff;
    ${({ fullWidth }) => fullWidth && `position: fixed;`}
    ${({ fullWidth }) =>
      !fullWidth &&
      `width: 70px; .MuiList-root, .MuiBox-root, .MuiPaper-root {width: fit-content}`}
    & .MuiDrawer-paper {
      padding-right: 10px;
      ${({ fullWidth }) => fullWidth && `padding-right: 15px;`};
    }
  }
`;

export const Icon = styled(ListItemIcon)<PropTypes>`
  padding: 0 1rem;
  ${({ isActive }) => isActive && `& svg {fill: #202124;}`}
`;

export const ListItemStyled = styled(ListItem)<PropTypes>`
  ${({ fullWidth }) => !fullWidth && `width: fit-content !important;`}
`;

export const ListButton = styled(ListItemButton)<PropTypes>`
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

export const ListItemTextStyled = styled(ListItemText)<PropTypes>`
  ${({ fullWidth }) =>
    !fullWidth && "display: none !important; margin-left: 15px;"}
  color: #202124;
`;
