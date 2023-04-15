import React, { useState } from "react";
import { Button, Col, Container, Form, Stack } from "react-bootstrap";
import { BsGoogle } from "react-icons/bs";
import { AiFillFacebook } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

import "./Signup.css";

const Signup = () => {
  //User state Data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureError, setProfilePictureError] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const { postData, error } = useFetch(
    "http://localhost:3001/users/add",
    "POST",
    "LOGIN"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
      name,
      username,
      profilePicture,
    };
    if (password !== repeatPassword) {
      setErr("Password dose not match");
    } else {
      postData(user);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  /** A function to check the type the size of the user Pic */
  const handleFileChange = (e) => {
    /** A clean up to the input type file so it will only take the last file we upload */
    setProfilePicture(null);

    let selected = e.target.files[0];

    if (!selected) {
      setProfilePictureError("Please select an image file");
      return;
    }
    /** To check if the file uploaded is an Image or not */
    if (!selected.type.includes("image")) {
      setProfilePictureError("The File must be an image");
      return;
    }
    /** To check to file size */
    if (selected.size > 900000) {
      setProfilePictureError("Image file must be less than 100kb");
      return;
    }
    setProfilePictureError(null);
    setProfilePicture(selected);
    console.log("thumbnail updated");
  };

  return (
    <Container className="pt-5 signup">
      <h2 className="text-center">Sign Up to Socialize</h2>
      <Stack className="pt-5" gap={5} direction="horizontal">
        <Col>
          <Form className="mt-5" onSubmit={(e) => handleSubmit(e)}>
            <Stack gap={4}>
              <Form.Group controlId="username">
                <Form.Label> User name:</Form.Label>
                <Form.Control
                  placeholder="User Name"
                  variant="text"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="name">
                <Form.Label>name:</Form.Label>
                <Form.Control
                  placeholder="Full Name"
                  variant="text"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  placeholder="Email"
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  placeholder="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="repeatpass">
                <Form.Label>Repeat Password:</Form.Label>
                <Form.Control
                  placeholder="Repeat Password"
                  type="password"
                  required
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Photo:</Form.Label>
                <Form.Control
                  placeholder="photo"
                  type="file"
                  required
                  onChange={handleFileChange}
                />
              </Form.Group>
            </Stack>
            <Stack
              gap={2}
              direction="horizontal"
              className="justify-content-end mt-4"
            >
              <Button type="submit">Signup</Button>
              <Link to="/login">
                <Button variant="outline-secondary">Login</Button>
              </Link>
            </Stack>
            {err && <div>{err}</div>}
            {profilePictureError && <div>{profilePictureError}</div>}
          </Form>
        </Col>
        <Col className="pt-5 autosingup d-flex ">
          <Stack
            gap={4}
            direction="vertical"
            className="d-flex justify-content-center align-items-center"
          >
            <Button className="btn btn-primary google">
              <BsGoogle /> Google
            </Button>
            <Button className="btn btn-secondary facebook">
              {" "}
              <AiFillFacebook /> Face Book
            </Button>
            <Button className="btn btn-success github">
              {" "}
              <FaGithub /> Github
            </Button>
          </Stack>
        </Col>
      </Stack>
    </Container>
  );
};

export default Signup;
