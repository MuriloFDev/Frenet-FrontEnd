import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./Router";
import Consult from "./Router/consult";
import Quote from "./Router/quote";
import SideBar from "./components/SideBar";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex h-screen bg-white">
              <div className="w-72">
                <SideBar />
              </div>
              <Home />
            </div>
          }
        />
        <Route
          path="/quote"
          element={
            <div className="flex h-screen bg-white">
              <div className="w-72">
                <SideBar />
              </div>
              <Quote />
            </div>
          }
        />

        <Route
          path="/consult"
          element={
            <div className="flex h-screen bg-white">
              <div className="w-72">
                <SideBar />
              </div>
              <Consult />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
