import { noteType } from "../hooks/useMainContext";

const NOTES_ACTIONS = {
  ADDED: "notes/added",
  UPDATED: "notes/updated",
  DELETED: "notes/deleted",
} as const;
type actionType = {
  type: typeof NOTES_ACTIONS[keyof typeof NOTES_ACTIONS];
  payload: any;
};
export const notesReducer = (
  notes: noteType[],
  action: actionType
): noteType[] => {
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
};

export const addNote = (note: noteType): actionType => ({
  type: NOTES_ACTIONS.ADDED,
  payload: { note },
});
export const updateNote = (id: string, note: noteType): actionType => ({
  type: NOTES_ACTIONS.UPDATED,
  payload: { id, note },
});
export const deleteNote = (id: string): actionType => ({
  type: NOTES_ACTIONS.DELETED,
  payload: { id },
});
