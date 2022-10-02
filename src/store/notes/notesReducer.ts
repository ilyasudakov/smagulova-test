import { noteType } from "../../hooks/useMainContext";

import {
  addNote,
  deleteNote,
  NOTES_ACTIONS,
  saveNotesInStorage,
  updateNote,
} from "./notesActions";

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
    case NOTES_ACTIONS.ADDED: {
      const _notes = [
        ...notes,
        { ...action.payload.note, id: new Date().toISOString() },
      ];
      saveNotesInStorage(_notes);
      return _notes;
    }
    case NOTES_ACTIONS.UPDATED: {
      const _notes = notes.map((item) =>
        item.id === action.payload.id
          ? { ...action.payload.note, lastEdited: new Date() }
          : item
      );
      saveNotesInStorage(_notes);
      return _notes;
    }
    case NOTES_ACTIONS.DELETED: {
      const _notes = notes.filter((item) => item.id !== action.payload.id);
      saveNotesInStorage(_notes);
      return _notes;
    }
    default:
      return notes;
  }
}
