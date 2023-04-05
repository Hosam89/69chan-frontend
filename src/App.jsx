import { Route, Routes } from "react-router-dom";
import { Home, Login, Signup } from "./pages/index";
import "./App.css";
import "./bootstrap.min.css";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="App d-flex flex-column">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
