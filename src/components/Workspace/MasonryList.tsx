import { useState } from "react";

import Masonry from "@mui/lab/Masonry";

import { MainContextType } from "../../App";

import ListItem from "./ListItem";
import ModalNote from "./ModalNote";

export default function MasonryList({
  notes,
  searchQuery,
  changeStatus,
}: {
  searchQuery: MainContextType["searchQuery"];
  notes: MainContextType["notes"];
  changeStatus: MainContextType["changeStatus"];
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

  const filteredNotes = notes.filter(({ value }) =>
    value.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
  );
  return (
    <>
      <ModalNote
        handleClose={handleClose}
        showModal={showModal}
        changeStatus={changeStatus}
        note={notes.find(({ id }) => selectedNote === id) || notes[0]}
      />
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
        {filteredNotes.map(({ id, value }) => (
          <ListItem
            id={id}
            key={id}
            value={value}
            changeStatus={changeStatus}
            onClick={() => handleOpen(id)}
          />
        ))}
      </Masonry>
    </>
  );
}
