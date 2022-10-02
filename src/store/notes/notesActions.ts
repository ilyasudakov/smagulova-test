import { noteType } from "../../hooks/useMainContext";

// Action' для диспатча действий с заметками
export type actionNoteType = {
  type: typeof NOTES_ACTIONS[keyof typeof NOTES_ACTIONS];
  payload: any;
};

export const NOTES_ACTIONS = {
  ADDED: "notes/added",
  UPDATED: "notes/updated",
  DELETED: "notes/deleted",
} as const;

export const addNote = (note: noteType) => ({
  type: NOTES_ACTIONS.ADDED,
  payload: { note },
});
export const updateNote = (id: string, note: noteType) => ({
  type: NOTES_ACTIONS.UPDATED,
  payload: { id, note },
});
export const deleteNote = (id: string) => ({
  type: NOTES_ACTIONS.DELETED,
  payload: { id },
});
export const saveNotesInStorage = (notes: noteType[]) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};
export const loadNotesFromStorage = () => {
  const cached = localStorage.getItem("notes");
  if (cached === "undefined" || cached === null) return null;
  return JSON.parse(cached !== "undefined" ? cached : "[]");
};
