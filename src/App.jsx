import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRouter from "./components/AppRouter";

function App() {
  return (
    <div className="bg-white">
      <BrowserRouter>
        <Navbar />
        <div className="relative isolate px-3 md:px-6 pt-14 lg:px-8">
          <AppRouter />
          {/* <ColorContainer /> */}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
