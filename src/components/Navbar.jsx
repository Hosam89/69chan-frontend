import React from "react";
import { Button } from "react-bootstrap";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, useNavigate } from "react-router-dom";
function Navbar() {
  const { dispatch, user } = useAuthContext();

  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });

    navigate("/login");
  };

  return (
    <div>
      {" "}
      {user && <Button onClick={() => handleLogOut()}>Log Out</Button>}
      <Link to={"/posts"}>Posts</Link>
    </div>
  );
}

export default Navbar;
