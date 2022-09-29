import { useState, createContext } from "react";

import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Workspace from "./components/Workspace";

type noteType = {
  value: string;
  id: string;
  status: "Активно" | "Архив" | "Корзина";
};
type pages = "Заметки" | "Архив" | "Корзина";
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
  changeStatus: (id: string, status: noteType["status"]) => void;
};
export const MainContext = createContext<MainContextType>({
  menuIsOpen: true,
  searchQuery: "",
  setSearchQuery: () => {},
  setCurPage: () => {},
  setOpenMenu: () => {},
  addNote: () => {},
  changeStatus: () => {},
  notes: [],
  curPage: "Заметки",
});

function App() {
  const [menuIsOpen, setOpenMenu] = useState(true);
  const [curPage, setCurPage] = useState<pages>("Заметки");
  const [searchQuery, setSearchQuery] = useState("");
  const [notes, setNotes] = useState<noteType[]>([
    { id: "1", value: "Сделать это сделать это", status: "Активно" },
    { id: "2", value: "Сделать это сегодня", status: "Активно" },
    { id: "3", value: "Сделать это завтра", status: "Активно" },
  ]);

  return (
    <>
      <CssBaseline />
      <MainContext.Provider
        value={{
          menuIsOpen,
          curPage,
          setCurPage,
          searchQuery,
          setSearchQuery: (value) => setSearchQuery(value.toLocaleLowerCase()),
          setOpenMenu: () => setOpenMenu(!menuIsOpen),
          notes,
          addNote: (note) =>
            setNotes((notes) => [
              ...notes,
              { ...note, id: new Date().toISOString() },
            ]),
          changeStatus: (id, status) =>
            setNotes((notes) =>
              notes.map((item) =>
                item.id === id ? { ...item, status: status } : item
              )
            ),
        }}
      >
        <Header />
        <Box sx={{ display: "flex" }}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Toolbar />
            <Workspace />
          </Box>
        </Box>
      </MainContext.Provider>
    </>
  );
}

export default App;
