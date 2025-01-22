import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../public/pages/Home";
import About from "../public/pages/About";
import Services from "../public/pages/Services";

const App = () => {
  return (
    <div className="p-4">
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Services" element={<Services />} />
      </Routes>
    </div>
  );
};

export default App;
