import styled from "styled-components";

import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const drawerWidthMax = 240;
const drawerWidthMin = 80;

type PropTypes = {
  $isActive?: boolean;
  $fullwidth?: boolean;
};

export const DrawerStyled = styled(Drawer)<PropTypes>`
  width: ${({ $fullwidth }) =>
    $fullwidth ? `${drawerWidthMax}px` : `${drawerWidthMin}px`};
  flex-shrink: 0;
  z-index: 10;

  & .MuiDrawer-paper {
    width: ${({ $fullwidth }) =>
      $fullwidth ? `${drawerWidthMax}px` : `${drawerWidthMin}px`};
    border-right: none;
  }

  @media (max-width: 768px) {
    background-color: #fff;
    ${({ $fullwidth }) => $fullwidth && `position: fixed;`}
    ${({ $fullwidth }) =>
      !$fullwidth &&
      `width: 70px; .MuiList-root, .MuiBox-root, .MuiPaper-root {width: fit-content}`}
    & .MuiDrawer-paper {
      padding-right: 10px;
      ${({ $fullwidth }) => $fullwidth && `padding-right: 15px;`};
    }
  }
`;

export const Icon = styled(ListItemIcon)<PropTypes>`
  padding: 0 1rem;
  ${({ $isActive }) => $isActive && `& svg {fill: #202124;}`}
`;

export const ListItemStyled = styled(ListItem)<PropTypes>`
  ${({ $fullwidth }) => !$fullwidth && `width: fit-content !important;`}
`;

export const ListButton = styled(ListItemButton)<PropTypes>`
  background-color: ${({ $isActive }) =>
    $isActive ? "#feefc3" : "#fff"} !important;
  border-radius: 0 25px 25px 0 !important;
  height: 48px;
  ${({ $fullwidth }) =>
    !$fullwidth &&
    `& {
    max-width: fit-content;
    border-radius: 25px !important;
    margin-left: 12px !important;
    padding: 8px 12px !important;
    }`};
`;

export const ListItemTextStyled = styled(ListItemText)<PropTypes>`
  ${({ $fullwidth }) =>
    !$fullwidth && "display: none !important; margin-left: 15px;"}
  color: #202124;
`;
