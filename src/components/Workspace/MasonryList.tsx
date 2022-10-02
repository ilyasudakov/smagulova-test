import { useMemo, useState } from "react";

import Masonry from "@mui/lab/Masonry";

import { MainContextType } from "../../hooks/useMainContext";

import ListItem from "./ListItem";
import ModalNote from "./ModalNote";

export default function MasonryList({
  notes,
  searchQuery,
  updateNote,
}: {
  searchQuery: MainContextType["searchQuery"];
  notes: MainContextType["notes"];
  updateNote: MainContextType["updateNote"];
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
  const selected = notes.find(({ id }) => selectedNote === id) || {
    value: "",
    title: "",
    id: "",
    status: "Активно",
  };
  return (
    <>
      <ModalNote
        handleClose={handleClose}
        showModal={showModal}
        updateNote={updateNote}
        note={selected}
      />
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
        {filteredNotes.map((note) => (
          <ListItem
            key={note.id}
            note={note}
            onClick={() => handleOpen(note.id)}
          />
        ))}
      </Masonry>
    </>
  );
}
