import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/Layout";
import Home from "./pages/Home";
import ExploreCultures from "./pages/ExploreCultures";
import CulturalQuiz from "./pages/CulturalQuiz";
import Resources from "./pages/Resources";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="explore" element={<ExploreCultures />} />
          <Route path="quiz" element={<CulturalQuiz />} />
          <Route path="resources" element={<Resources />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
