import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import GetData from "./GetData";

function App() {
  return (
    <div className="App bg-slate-800 w-screen h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/getData" element={<GetData />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
