import React, { useMemo, useState } from "react";

import Masonry from "@mui/lab/Masonry";

import { MainContextType, noteType } from "../../hooks/useMainContext";

import ListItem from "./ListItem";
import ModalNote from "./ModalNote";
import { Stack, styled } from "@mui/material";

export default function MasonryList({
  notes,
  searchQuery,
  updateNote,
  view,
}: {
  searchQuery: MainContextType["searchQuery"];
  notes: MainContextType["notes"];
  updateNote: MainContextType["updateNote"];
  view: MainContextType["view"];
}) {
  const [showModal, setShowModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);

  const handleClose = () => {
    setShowModal(false);
    setSelectedNote(null);
  };
  const handleOpen = (id: string) => {
    setSelectedNote(id);
    setShowModal(true);
  };

  const filteredNotes = useMemo(
    () =>
      notes.filter(({ value }) =>
        value.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
      ),
    [notes, searchQuery]
  );
  const renderedNotes = useMemo(
    () =>
      filteredNotes.map((note) => (
        <ListItem
          key={note.id}
          note={note}
          onClick={() => handleOpen(note.id)}
        />
      )),
    [filteredNotes]
  );
  const selected = useMemo<noteType>(
    () =>
      notes.find(({ id }) => selectedNote === id) || {
        value: "",
        title: "",
        lastEdited: new Date(),
        id: "",
        status: "Активно",
      },
    [selectedNote, notes]
  );
  const columns = view === "grid" ? { xs: 1, sm: 2, md: 3, lg: 4 } : 1;

  return (
    <>
      <ModalNote
        handleClose={handleClose}
        showModal={showModal}
        updateNote={updateNote}
        note={selected}
      />
      {view === "grid" ? (
        <Masonry columns={columns} spacing={2}>
          {renderedNotes}
        </Masonry>
      ) : (
        <StackStyled spacing={2}>{renderedNotes}</StackStyled>
      )}
    </>
  );
}

const StackStyled = styled(Stack)`
  margin: 0 auto;
  width: 100%;
  max-width: 600px;
`;
