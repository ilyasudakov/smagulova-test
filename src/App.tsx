import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />
      <div>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          123
        </Box>
      </div>
    </Box>
  );
}

export default App;
