import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/Layout";
import Home from "./pages/Home";
import BookSearchPage from "./pages/BookSearchPage";
import PoemsPage from "./pages/PoemsPage";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="books" element={<BookSearchPage />} />
          <Route path="poems" element={<PoemsPage />} />
          <Route path="resources" element={<Resources />} />
          
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
