import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Workspace from "./components/Workspace";

import { MainContextProvider } from "./hooks/useMainContext";

function App() {
  //Получаем Provider и values контекста, который хранит в себе данные о:
  //sidemenu, всех заметках, поисковом запросе, текущей навигации

  return (
    <>
      <CssBaseline />
      <MainContextProvider>
        <Header />
        <Box sx={{ display: "flex" }}>
          {/* Боковое меню */}
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Toolbar />
            {/* Рабочая область */}
            <Workspace />
          </Box>
        </Box>
      </MainContextProvider>
    </>
  );
}

export default App;
