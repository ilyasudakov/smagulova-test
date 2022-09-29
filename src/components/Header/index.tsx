import styled from "styled-components";
import { alpha } from "@mui/material/styles";

import { Box, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";

import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

const Logo = styled.img`
  max-width: 44px;
  padding-right: 4px;
`;

const AppBarStyled = styled(AppBar)`
  color: #5f6368 !important;
  box-shadow: inset 0 -1px 0 0 #dadce0 !important;
`;

const Search = styled("div")`
  position: relative;
  margin-left: 0;
  width: 100%;
  max-width: 720px;
  background-color: #f1f3f4;
  border-radius: 8px;
`;

const StyledInputBase = styled(InputBase)`
  color: inherit;
  width: 100%;
  margin-left: 56px;
  margin-right: 49px;
  & .MuiInputBase-input {
    padding-left: 10px;
    width: 100%;
    padding: 11px 0;
  }
`;

const SearchIconButton = styled(IconButton)`
  position: absolute !important;
  float: left;
  left: 5px;
  top: 2px;
  padding: 5px;
`;

const SearchWrapper = styled.div`
  display: flex;
  padding-left: 10px;
  padding-right: 30px;
`;

export default function Header() {
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
          {/* <Box sx={{ flexGrow: 1 }} /> */}
          <Box sx={{ flexGrow: 1 }}>
            <SearchWrapper>
              <Search>
                <SearchIconButton
                  size="medium"
                  aria-label="Search"
                  color="inherit"
                >
                  <SearchIcon />
                </SearchIconButton>
                <StyledInputBase
                  placeholder="Search"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </SearchWrapper>
          </Box>
          {/* <Box sx={{ flexGrow: 1 }} /> */}
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
