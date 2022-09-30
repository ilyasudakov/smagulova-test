import { createContext, useContext, useState } from "react";

export type noteType = {
  value: string;
  id: string;
  status: "Активно" | "Архив" | "Корзина";
};
export type pages = "Заметки" | "Архив" | "Корзина";
export const PageToStatus: { [i in pages]: noteType["status"] } = {
  Заметки: "Активно",
  Архив: "Архив",
  Корзина: "Корзина",
};
export type MainContextType = {
  curPage: pages;
  setCurPage: (page: pages) => void;
  menuIsOpen: boolean;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  setOpenMenu: () => void;
  notes: noteType[];
  addNote: (note: {
    value: noteType["value"];
    status: noteType["status"];
  }) => void;
  updateNote: (id: string, note: noteType) => void;
};
export const MainContext = createContext<MainContextType>({
  menuIsOpen: true,
  searchQuery: "",
  setSearchQuery: () => {},
  setCurPage: () => {},
  setOpenMenu: () => {},
  addNote: () => {},
  updateNote: () => {},
  notes: [],
  curPage: "Заметки",
});

export default function useMainContext() {
  return useContext(MainContext);
}
export function useMainContextProvider() {
  const [menuIsOpen, setOpenMenu] = useState(true);
  const [curPage, setCurPage] = useState<pages>("Заметки");
  const [searchQuery, setSearchQuery] = useState("");
  const [notes, setNotes] = useState<noteType[]>([
    { id: "1", value: "Моя задача №1", status: "Активно" },
    { id: "2", value: "Выполнить техническое задание", status: "Архив" },
    { id: "3", value: "Оформить баг-репорт", status: "Активно" },
  ]);
  const values: MainContextType = {
    menuIsOpen,
    curPage,
    setCurPage,
    searchQuery,
    setSearchQuery,
    setOpenMenu: () => setOpenMenu(!menuIsOpen),
    notes,
    addNote: (note) =>
      setNotes((notes) => [
        ...notes,
        { ...note, id: new Date().toISOString() },
      ]),
    updateNote: (id, newNote) =>
      setNotes((notes) =>
        notes.map((item) => (item.id === id ? newNote : item))
      ),
  };
  return {
    Provider: MainContext.Provider,
    values,
  };
}
