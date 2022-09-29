import { useContext } from "react";
import styled from "styled-components";

import { Box, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";

import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { MainContext } from "../../App";
import Searchbar from "./Searchbar";

const Logo = styled.img`
  max-width: 44px;
  padding-right: 4px;
`;

const AppBarStyled = styled(AppBar)`
  color: #5f6368 !important;
  box-shadow: inset 0 -1px 0 0 #dadce0 !important;
`;

export default function Header() {
  const { setOpenMenu, setSearchQuery, searchQuery } = useContext(MainContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarStyled
        position="fixed"
        color="inherit"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Box
            sx={{ display: "flex", alignItems: "center", minWidth: "232px" }}
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
              variant="h6"
              noWrap
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                paddingLeft: "4px",
                paddingRight: "10px",
              }}
            >
              Keep
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Searchbar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton size="large" aria-label="Search" color="inherit">
              <SearchIcon />
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
