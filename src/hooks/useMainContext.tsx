import {
  createContext,
  useContext,
  useState,
  useReducer,
  useMemo,
} from "react";

import notesReducer from "../store/notes/notesReducer";
import {
  addNote,
  deleteNote,
  loadNotesFromStorage,
  updateNote,
} from "../store/notes/notesActions";
import useScreenSize from "./useScreenSize";

// Контекст, который выполняет функцию глобального стора, в данном случае конечно
// лучше использовать state менеджер типо Redux/MobX, для лучшей эффективности,
// избегания лишних ререндеров, лучшей структуры кода, но такого было задание

export type pages = "Заметки" | "Архив" | "Корзина";
export type noteType = {
  title: string;
  value: string;
  lastEdited: Date;
  id: string;
  status: "Активно" | "Архив" | "Корзина";
};
export const PageToStatus: { [i in pages]: noteType["status"] } = {
  Заметки: "Активно",
  Архив: "Архив",
  Корзина: "Корзина",
};
type views = "list" | "grid";
//Тип контекста
export type MainContextType = {
  curPage: pages;
  setCurPage: (page: pages) => void;

  view: views;
  setView: (view: views) => void;

  menuIsOpen: boolean;
  setOpenMenu: () => void;

  searchQuery: string;
  setSearchQuery: (value: string) => void;

  notes: noteType[];
  addNote: (note: {
    title: noteType["title"];
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

  view: "list",
  setView: () => {},

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

const defaultValue: noteType[] = [
  {
    id: "1",
    lastEdited: new Date(),
    title: "Очень важно",
    value: "Моя задача №1",
    status: "Активно",
  },
  {
    id: "2",
    lastEdited: new Date(),
    title: "",
    value: "Выполнить техническое задание",
    status: "Архив",
  },
  {
    id: "3",
    lastEdited: new Date(),
    title: "",
    value: "Оформить баг-репорт",
    status: "Активно",
  },
];

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
  const [screenWidth] = useScreenSize();
  const [menuIsOpen, setOpenMenu] = useState(screenWidth >= 768);
  const [curPage, setCurPage] = useState<pages>("Заметки");
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<views>("grid");

  const [notes, dispatch] = useReducer(
    notesReducer,
    // Если есть заметки в localStorage, загружаем их
    loadNotesFromStorage() || defaultValue
  );
  // Мемоизированные заметки
  const { notes: memoizedNotes, dispatch: memoizedDispatch } = useMemo(
    () => ({ notes, dispatch }),
    [notes, dispatch]
  );

  return (
    <MainContext.Provider
      value={{
        view,
        setView,

        curPage,
        setCurPage,

        searchQuery,
        setSearchQuery,

        menuIsOpen,
        setOpenMenu: () => setOpenMenu(!menuIsOpen),

        notes: memoizedNotes,
        // Создание заметки (тут дата создания - unique id)
        addNote: (note) => memoizedDispatch(addNote(note)),
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
