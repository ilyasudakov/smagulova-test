import { createContext, useContext, useState } from "react";

// Контекст, который выполняет функцию глобального стора, в данном случае конечно
// лучше использовать state менеджер типо Redux/MobX, для лучшей эффективности,
// избегания лишних ререндеров, лучшей структуры кода, но такого было задание

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
//Тип контекста
export type MainContextType = {
  curPage: pages;
  setCurPage: (page: pages) => void;

  menuIsOpen: boolean;
  setOpenMenu: () => void;

  searchQuery: string;
  setSearchQuery: (value: string) => void;

  notes: noteType[];
  addNote: (note: {
    value: noteType["value"];
    status: noteType["status"];
  }) => void;
  updateNote: (id: string, note: noteType) => void;
  deleteNote: (id: string) => void;
};
// Создание и дефолт значения
export const MainContext = createContext<MainContextType>({
  menuIsOpen: true,
  setOpenMenu: () => {},

  searchQuery: "",
  setSearchQuery: () => {},

  curPage: "Заметки",
  setCurPage: () => {},

  addNote: () => {},
  updateNote: () => {},
  deleteNote: () => {},
  notes: [],
});

// Хук для упрощения использования данных из контекста
export default function useMainContext() {
  return useContext(MainContext);
}
// Хук для инициализации MainContext.Provider в корне проекта
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
    curPage,
    setCurPage,

    searchQuery,
    setSearchQuery,

    menuIsOpen,
    setOpenMenu: () => setOpenMenu(!menuIsOpen),

    notes,
    // Создание заметки (тут дата создания - unique id)
    addNote: (note) =>
      setNotes((notes) => [
        ...notes,
        { ...note, id: new Date().toISOString() },
      ]),
    // Редактирование заметки
    updateNote: (id, newNote) =>
      setNotes((notes) =>
        notes.map((item) => (item.id === id ? newNote : item))
      ),
    // Удаление заметки
    deleteNote: (id) =>
      setNotes((notes) => notes.filter((item) => item.id !== id)),
  };
  return {
    Provider: MainContext.Provider,
    values,
  };
}
