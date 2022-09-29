import { useState } from "react";
import styled from "styled-components";

import { MainContextType } from "../../App";

import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";

const Search = styled("div")`
  position: relative;
  width: 100%;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;

const StyledInputBase = styled(InputBase)`
  color: inherit;
  width: 100%;
  padding: 12px 16px;
  & .MuiInputBase-input {
    width: 100%;
    padding: 0;
  }
`;
const Wrapper = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

export default function CreateNoteBar({
  addNote,
}: {
  addNote: MainContextType["addNote"];
}) {
  const [note, setNote] = useState("");

  return (
    <Wrapper>
      <Search>
        <StyledInputBase
          placeholder="Заметка.."
          inputProps={{ "aria-label": "заметка" }}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            setNote("");
            addNote({ value: note, status: "Активно" });
          }}
        />
      </Search>
    </Wrapper>
  );
}
