import { noteType } from "../../hooks/useMainContext";

import { addNote, deleteNote, NOTES_ACTIONS, updateNote } from "./notesActions";

// Доступные действия для заметок

type actionsType =
  | ReturnType<typeof addNote>
  | ReturnType<typeof updateNote>
  | ReturnType<typeof deleteNote>;

export default function notesReducer(
  notes: noteType[],
  action: actionsType
): noteType[] {
  switch (action.type) {
    case NOTES_ACTIONS.ADDED:
      return [
        ...notes,
        { ...action.payload.note, id: new Date().toISOString() },
      ];
    case NOTES_ACTIONS.UPDATED:
      return notes.map((item) =>
        item.id === action.payload.id ? action.payload.note : item
      );
    case NOTES_ACTIONS.DELETED:
      return notes.filter((item) => item.id !== action.payload.id);
    default:
      return notes;
  }
}
