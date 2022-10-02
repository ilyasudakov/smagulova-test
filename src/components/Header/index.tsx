import styled from "styled-components";

import { useState } from "react";

import { Box, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";

import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";

import Searchbar from "./Searchbar";

import useMainContext from "../../hooks/useMainContext";

const Logo = styled.img`
  max-width: 44px;
  padding-right: 4px;
`;

const AppBarStyled = styled(AppBar)`
  color: #5f6368 !important;
  box-shadow: inset 0 -1px 0 0 #dadce0 !important;
`;

export default function Header() {
  const { setOpenMenu, setSearchQuery, searchQuery, view, setView } =
    useMainContext();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarStyled
        position="fixed"
        color="inherit"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              minWidth: { xs: "150px", sm: "232px" },
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: "4px" }}
              onClick={setOpenMenu}
            >
              <MenuIcon />
            </IconButton>
            <Logo src="/keep_logo.png" alt="logo" />
            <Typography
              fontFamily="Product Sans Regular"
              noWrap
              component="div"
              sx={{
                fontSize: "22px",
                display: { xs: "none", sm: "block" },
                paddingLeft: "4px",
                paddingRight: "10px",
              }}
            >
              Keep
            </Typography>
          </Box>
          {/* Searchbar для >= tablet */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }}>
            <Searchbar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </Box>
          {/* Searchbar для мобилок */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: showSearch ? "block" : "none", md: "none" },
              position: "absolute",
              left: 0,
            }}
          >
            <Searchbar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              customIcon={{
                icon: <ArrowBackOutlinedIcon />,
                onClick: () => setShowSearch(false),
              }}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <IconButton
              size="large"
              aria-label="Search"
              color="inherit"
              onClick={() => setShowSearch(!showSearch)}
              sx={{ display: { xs: "inline-flex", md: "none" } }}
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="View"
              color="inherit"
              onClick={() => setView(view === "list" ? "grid" : "list")}
            >
              {view === "list" ? (
                <GridViewOutlinedIcon />
              ) : (
                <ViewAgendaOutlinedIcon />
              )}
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBarStyled>
    </Box>
  );
}
