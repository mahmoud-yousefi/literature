import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/Layout";
import Home from "./pages/Home";
import PicturesPage from "./pages/PicturesPage";
import PictureDetailPage from "./pages/PictureDetailPage";
import PoemsPage from "./pages/PoemsPage";
import MemoriesPage from "./pages/MemoriesPage";
import NotFound from "./pages/NotFound";
import PoemDetailPage from "./pages/PoemDetailPage";

const App: React.FC = () => {
  return (
    <Router basename="/literature">
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="pictures" element={<PicturesPage />} />
          <Route path="pictures/:id" element={<PictureDetailPage />} />
          <Route path="poems/:id" element={<PoemDetailPage />} />
          <Route path="poems" element={<PoemsPage />} />
          <Route path="memories" element={<MemoriesPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
