import { useContext } from "react";

import styled from "styled-components";

import { Box } from "@mui/material";

import CreateNoteBar from "./CreateNoteBar";
import { MainContext } from "../../App";
import MasonryList from "./MasonryList";

const Wrapper = styled(Box)`
  margin: 8px 1rem;
`;

export default function Workspace() {
  const { notes, addNote, searchQuery, changeStatus } = useContext(MainContext);

  return (
    <Wrapper>
      <CreateNoteBar addNote={addNote} />
      <MasonryList
        changeStatus={changeStatus}
        notes={notes.filter(({ status }) => status === "Активно")}
        searchQuery={searchQuery}
      />
    </Wrapper>
  );
}
