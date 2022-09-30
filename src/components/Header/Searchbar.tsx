import SearchIcon from "@mui/icons-material/Search";

import { MainContextType } from "../../hooks/useMainContext";

import * as Styled from "./Searchbar.styled";

export default function Searchbar({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: MainContextType["searchQuery"];
  setSearchQuery: MainContextType["setSearchQuery"];
}) {
  return (
    <Styled.SearchWrapper>
      <Styled.Search>
        <Styled.SearchIconButton
          size="medium"
          aria-label="поиск"
          color="inherit"
        >
          <SearchIcon />
        </Styled.SearchIconButton>
        <Styled.StyledInputBase
          placeholder="Поиск"
          inputProps={{ "aria-label": "поиск" }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Styled.Search>
    </Styled.SearchWrapper>
  );
}
