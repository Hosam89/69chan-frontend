import React, { useState } from "react";
import { Stack } from "react-bootstrap";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useWindowSize } from "../hooks/useWindowSize";
import "./Navbar.css";
import { FaBars } from "react-icons/fa";

function Navbar() {
  const { dispatch, user } = useAuthContext();
  const [drop, setDrop] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const size = useWindowSize();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });

    navigate("/login");
  };

  const handleHamburgerClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      {size.width <= 551 && (
        <div className="hamburgerIcon" onClick={handleHamburgerClick}>
          <FaBars />
        </div>
      )}
      <div
        className={`navContent navBar d-flex justify-content-evenly p-3 ${
          size.width <= 551 ? (isNavOpen ? "mobile-open" : "mobile") : ""
        }`}
      >
        <div className="d-flex flex-column justify-content-between">
          {user && (
            <>
              <div
                className="userContainer mt-3"
                onClick={() => setDrop(!drop)}
              >
                <img src={user.profilePicture} alt="" />
                <p className="mt-2">{user.username}</p>
                {drop && (
                  <div className="userDropDown">
                    <ul>
                      <li>Profile</li>
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
                <Link to={`/userpost/${user._id}`}>My Posts</Link>
                <Link to={"/"}>Friend</Link>
                <Link to={"/"}>For You</Link>
                <Link to={"/addpost"}>Create Your Own</Link>
                <Link to={"/"}>Chat</Link>
              </Stack>
            </>
          )}
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Navbar;
