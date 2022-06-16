import { Box, CssBaseline } from "@mui/material";
import { Route, Routes, useNavigate} from "react-router-dom"

import TopNavBar from "../components/navbar";
import Listar from "../components/newList";
import Bookmarks from "../components/bookmarks"

import backgroundHome from "../issues/images.jpeg";

function App() {



  return (
    <Box
      style={{
        backgroundImage: `url(${backgroundHome})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: 672
      }}
    >
      <CssBaseline />
      <TopNavBar  />
      <Routes>
        <Route path="/" element={<Listar />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Routes>
    </Box>
  );
}

export default App;
