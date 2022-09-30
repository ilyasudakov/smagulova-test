import styled from "styled-components";

import { Box } from "@mui/material";

import CreateNoteBar from "./CreateNoteBar";
import useMainContext, { PageToStatus } from "../../hooks/useMainContext";
import MasonryList from "./MasonryList";

const Wrapper = styled(Box)`
  margin: 8px 1rem;
`;

export default function Workspace() {
  const { notes, addNote, searchQuery, curPage, updateNote } = useMainContext();

  return (
    <Wrapper>
      <CreateNoteBar addNote={addNote} />
      <MasonryList
        updateNote={updateNote}
        notes={notes.filter(({ status }) => status === PageToStatus[curPage])}
        searchQuery={searchQuery}
      />
    </Wrapper>
  );
}
