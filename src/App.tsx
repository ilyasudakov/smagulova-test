import { useState, createContext } from "react";

import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Workspace from "./components/Workspace";

type noteType = { value: string; id: string };
export type MainContextType = {
  menuIsOpen: boolean;
  setOpenMenu: () => void;
  notes: noteType[];
  addNote: (note: { value: noteType["value"] }) => void;
};
export const MainContext = createContext<MainContextType>({
  menuIsOpen: true,
  setOpenMenu: () => {},
  addNote: () => {},
  notes: [],
});

function App() {
  const [menuIsOpen, setOpenMenu] = useState(true);
  const [notes, setNotes] = useState<noteType[]>([]);

  return (
    <>
      <CssBaseline />
      <MainContext.Provider
        value={{
          menuIsOpen,
          setOpenMenu: () => setOpenMenu(!menuIsOpen),
          notes,
          addNote: (note) =>
            setNotes((notes) => [
              ...notes,
              { ...note, id: new Date().toISOString() },
            ]),
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
