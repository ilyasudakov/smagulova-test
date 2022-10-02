import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";

import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import useMainContext, { MainContextType } from "../../hooks/useMainContext";

import * as Styled from "./Sidebar.styled";

export default function Sidebar() {
  const { menuIsOpen, curPage, setCurPage } = useMainContext();

  const menuItems: {
    text: MainContextType["curPage"];
    icon: React.ReactNode;
  }[] = [
    { text: "Заметки", icon: <LightbulbOutlinedIcon /> },
    { text: "Архив", icon: <ArchiveOutlinedIcon /> },
    { text: "Корзина", icon: <DeleteOutlineOutlinedIcon /> },
  ];

  return (
    <Styled.DrawerStyled
      variant="permanent"
      $fullwidth={menuIsOpen}
      open={false}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map(({ text, icon }) => (
            <Styled.ListItemStyled
              $fullwidth={menuIsOpen}
              key={text}
              disablePadding
            >
              <Styled.ListButton
                $fullwidth={menuIsOpen}
                $isActive={text === curPage}
                onClick={() => setCurPage(text)}
              >
                <Styled.Icon
                  color={text === curPage ? "black" : ""}
                  $isActive={text === curPage}
                  sx={{
                    ...(menuIsOpen ? {} : { padding: 0, minWidth: "auto" }),
                  }}
                >
                  {icon}
                </Styled.Icon>
                <Styled.ListItemTextStyled
                  primaryTypographyProps={{ fontSize: "14px" }}
                  primary={text}
                  $fullwidth={menuIsOpen}
                />
              </Styled.ListButton>
            </Styled.ListItemStyled>
          ))}
        </List>
      </Box>
    </Styled.DrawerStyled>
  );
}
