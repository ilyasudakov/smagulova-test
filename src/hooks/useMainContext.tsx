import {
  createContext,
  useContext,
  useState,
  useReducer,
  useMemo,
} from "react";

import notesReducer from "../store/notes/notesReducer";
import { addNote, deleteNote, updateNote } from "../store/notes/notesActions";

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
const initialValue: MainContextType = {
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
};
export const MainContext = createContext<MainContextType>(initialValue);

// Хук для упрощения использования данных из контекста
export default function useMainContext() {
  return useContext(MainContext);
}
// Хук для инициализации MainContext.Provider в корне проекта
export function MainContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuIsOpen, setOpenMenu] = useState(true);
  const [curPage, setCurPage] = useState<pages>("Заметки");
  const [searchQuery, setSearchQuery] = useState("");

  const [notes, dispatch] = useReducer(notesReducer, [
    { id: "1", value: "Моя задача №1", status: "Активно" },
    { id: "2", value: "Выполнить техническое задание", status: "Архив" },
    { id: "3", value: "Оформить баг-репорт", status: "Активно" },
  ]);
  // Мемоизированные заметки
  const { notes: memoizedNotes, dispatch: memoizedDispatch } = useMemo(
    () => ({ notes, dispatch }),
    [notes, dispatch]
  );

  return (
    <MainContext.Provider
      value={{
        curPage,
        setCurPage,

        searchQuery,
        setSearchQuery,

        menuIsOpen,
        setOpenMenu: () => setOpenMenu(!menuIsOpen),

        notes: memoizedNotes,
        // Создание заметки (тут дата создания - unique id)
        addNote: (note) => memoizedDispatch(addNote({ ...note, id: "" })),
        // Редактирование заметки
        updateNote: (id, note) => memoizedDispatch(updateNote(id, note)),
        // Удаление заметки
        deleteNote: (id) => memoizedDispatch(deleteNote(id)),
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
