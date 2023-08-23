import { BrowserRouter } from "react-router-dom";
import React from 'react'
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";


function App() {
  return (
    <div className="bg-white">
      <BrowserRouter>
        <Navbar/>
        <AppRouter/>
      </BrowserRouter>
    </div>
  );
}

export default App;
