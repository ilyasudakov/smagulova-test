import { useState } from "react";
import styled from "styled-components";

import { MainContextType } from "../../hooks/useMainContext";

import InputBase from "@mui/material/InputBase";

const Input = styled("div")`
  position: relative;
  width: 100%;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
  border-radius: 8px;
`;

const StyledInputBase = styled(InputBase)`
  color: inherit;
  width: 100%;
  padding: 8px 16px;
  & .MuiInputBase-input {
    width: 100%;
    padding: 0;
  }
`;
const Wrapper = styled.div`
  display: flex;
  max-width: 600px;
  margin: 32px auto 16px auto;
`;

export default function CreateNoteBar({
  addNote,
}: {
  addNote: MainContextType["addNote"];
}) {
  const [note, setNote] = useState("");

  return (
    <Wrapper>
      <Input>
        <StyledInputBase
          placeholder="Заметка.."
          inputProps={{ "aria-label": "заметка" }}
          value={note}
          autoFocus
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            setNote("");
            addNote({ value: note, status: "Активно" });
          }}
        />
      </Input>
    </Wrapper>
  );
}
