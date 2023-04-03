import { Route, Routes } from "react-router-dom";
import { Home, Login, Signup } from "./pages/index";
import "./App.css";
import "./bootstrap.min.css";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
