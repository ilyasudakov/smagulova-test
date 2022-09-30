import styled from "styled-components";

import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";

export const Search = styled("div")`
  position: relative;
  margin-left: 0;
  width: 100%;
  max-width: 720px;
  background-color: #f1f3f4;
  border-radius: 8px;
`;

export const StyledInputBase = styled(InputBase)`
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

export const SearchIconButton = styled(IconButton)`
  position: absolute !important;
  float: left;
  left: 5px;
  top: 2px;
  padding: 5px;
`;

export const SearchWrapper = styled.div`
  display: flex;
  padding-left: 10px;
  padding-right: 30px;
`;
