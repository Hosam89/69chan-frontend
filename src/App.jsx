import { Navigate, Route, Routes } from "react-router-dom";
import { Home, Login, Post, Signup } from "./pages/index";
import { Footer, Navbar } from "./components/index";
import { useAuthContext } from "./hooks/useAuthContext";

import "./App.css";
import "./bootstrap.min.css";
function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      {user && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/post/:id"
          element={user ? <Post /> : <Navigate to={"/login"} />}
        />

        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        {!user && <Route path="/login" element={<Login />} />}
      </Routes>
    </div>
  );
}

export default App;
