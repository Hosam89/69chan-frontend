import React, { useState } from "react";
import { Stack } from "react-bootstrap";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, useNavigate } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  const { dispatch, user } = useAuthContext();
  const [drop, setDrop] = useState(false);
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });

    navigate("/login");
  };

  return (
    <div className="navBar d-flex flex-column justify-content-evenly ">
      {user && (
        <>
          <div className="userContainer mt-3" onClick={() => setDrop(!drop)}>
            <img src={user.profilePicture} alt="" />
            <p className="mt-2">{user.username}</p>
            {drop && (
              <div className="userDropDown">
                <ul>
                  <li>My Profile</li>
                  <li>Settings</li>
                  <li onClick={() => handleLogOut()}>Log Out</li>
                </ul>
              </div>
            )}
          </div>
          <Stack
            direction="vertical"
            gap={4}
            className="align-items-center justify-content-center"
          >
            <Link to={"/"}>Feed</Link>
            <Link to={"/"}>My Posts</Link>
            <Link to={"/"}>Friend</Link>
            <Link to={"/"}>For You</Link>
            <Link to={"/addpost"}>Create Your Own</Link>
          </Stack>
        </>
      )}
    </div>
  );
}

export default Navbar;
