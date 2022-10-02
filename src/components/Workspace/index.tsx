import styled from "styled-components";

import { Box } from "@mui/material";

import CreateNoteBar from "./CreateNoteBar";
import useMainContext, { PageToStatus } from "../../hooks/useMainContext";
import MasonryList from "./MasonryList";

const Wrapper = styled(Box)`
  margin: 8px 1rem;
`;

export default function Workspace() {
  const { notes, addNote, searchQuery, curPage, updateNote, view } =
    useMainContext();

  return (
    <Wrapper>
      {/* Поле создания заметок */}
      <CreateNoteBar addNote={addNote} />
      {/* Список заметок */}
      <MasonryList
        updateNote={updateNote}
        notes={notes.filter(({ status }) => status === PageToStatus[curPage])}
        searchQuery={searchQuery}
        view={view}
      />
    </Wrapper>
  );
}
