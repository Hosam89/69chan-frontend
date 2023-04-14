import React from "react";
import { Button, Stack } from "react-bootstrap";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, useNavigate } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  const { dispatch, user } = useAuthContext();

  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });

    navigate("/login");
  };

  return (
    <div className="navBar">
      {user && (
        <Stack
          direction="horizontal"
          gap={4}
          className="justify-content-center mt-3 "
        >
          <Link to={"/"}>Feed</Link>
          <Link to={"/"}>My Posts</Link>
          <Button onClick={() => handleLogOut()}>Log Out</Button>
        </Stack>
      )}
    </div>
  );
}

export default Navbar;
