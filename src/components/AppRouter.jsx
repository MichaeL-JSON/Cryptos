import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import News from "../pages/News";
import About from "../pages/About";
import Converter from "../pages/Converter";
import Portfolio from "../pages/Portfolio";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/news" element={<News />} />
      <Route path="/about" element={<About />} />
      <Route path="/converter" element={<Converter />} />
      <Route path="*" element={<Home to="/" />} />
    </Routes>
  );
};

export default AppRouter;
