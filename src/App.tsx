import { useState, createContext } from "react";

import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export const MainContext = createContext<{
  menuIsOpen: boolean;
  setOpenMenu: () => void;
}>({
  menuIsOpen: true,
  setOpenMenu: () => {},
});

function App() {
  const [menuIsOpen, setOpenMenu] = useState(true);

  return (
    <>
      <CssBaseline />
      <MainContext.Provider
        value={{
          menuIsOpen,
          setOpenMenu: () => setOpenMenu(!menuIsOpen),
        }}
      >
        <Header />
        <Box sx={{ display: "flex" }}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Toolbar />
            123 asd fasd fasd fasd fasdf
          </Box>
        </Box>
      </MainContext.Provider>
    </>
  );
}

export default App;
