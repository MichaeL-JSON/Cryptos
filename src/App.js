import { BrowserRouter } from "react-router-dom";
import React from 'react'
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import ColorContainer from "./layouts/ColorContainer";


function App() {
  return (
    <div className="bg-white">
        <BrowserRouter>
            <Navbar/>
            <div className="relative isolate px-6 pt-14 lg:px-8">
              <AppRouter/>
              <ColorContainer/>
            </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
