import { noteType } from "../../hooks/useMainContext";

import { actionNoteType, NOTES_ACTIONS } from "./notesActions";

// Доступные действия для заметок

export default function notesReducer(
  notes: noteType[],
  action: actionNoteType
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
