import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/Layout";
import Home from "./pages/Home";
import PicturesPage from "./pages/PicturesPage";
import PoemsPage from "./pages/PoemsPage";
import MemoriesPage from "./pages/MemoriesPage";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  return (
    <Router basename="/literature">
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="pictures" element={<PicturesPage />} />
          <Route path="poems" element={<PoemsPage />} />
          <Route path="memories" element={<MemoriesPage />} />
          <Route path="not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
