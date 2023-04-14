import React from "react";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { useFetch } from "../../hooks/useFetch";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./Login.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { dispatch } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState();
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    const userlogin = {
      email,
      password,
    };
    try {
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        body: JSON.stringify(userlogin),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: data });
        navigate("/");
      }, 2000);
    } catch (error) {
      setErr(error);
    }
  };
  return (
    <Container className="mt-5 login">
      <h2>Login to Socialize</h2>
      <Form onSubmit={(e) => handleLogIn(e)}>
        <Stack gap={2}>
          <Form.Group controlId="username">
            <Form.Label> User Email:</Form.Label>
            <Form.Control
              placeholder="Email"
              variant="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Stack>
        <Button variant="primary" className="mt-5" type="submit">
          Login
        </Button>
      </Form>
      {err && <div>{err.message}</div>}
    </Container>
  );
};

export default Login;
