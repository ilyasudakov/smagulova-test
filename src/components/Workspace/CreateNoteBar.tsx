import { useState } from "react";
import styled from "styled-components";

import { MainContextType } from "../../hooks/useMainContext";

import InputBase from "@mui/material/InputBase";
import { ClickAwayListener } from "@mui/base";

const Input = styled("div")`
  width: 100%;
  color: rgba(0, 0, 0, 0.702);
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
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    setTitle("");
    setNote("");
    addNote({ title, value: note, status: "Активно" });
    setIsOpen(false);
  };

  return (
    <ClickAwayListener
      onClickAway={() => (note !== "" ? handleSubmit() : setIsOpen(false))}
    >
      <Wrapper>
        <Input>
          {isOpen ? (
            <>
              <StyledInputBase
                placeholder="Название"
                inputProps={{ "aria-label": "Название" }}
                value={title}
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              <StyledInputBase
                placeholder="Заметка.."
                inputProps={{ "aria-label": "заметка" }}
                value={note}
                sx={{ fontSize: 14 }}
                autoFocus
                onChange={(e) => setNote(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </>
          ) : (
            <StyledInputBase
              placeholder="Заметка.."
              inputProps={{ "aria-label": "заметка" }}
              value=""
              onFocus={() => setIsOpen(true)}
            />
          )}
        </Input>
      </Wrapper>
    </ClickAwayListener>
  );
}
