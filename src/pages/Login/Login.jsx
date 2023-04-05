import React from "react";
import { Container, Form, Stack } from "react-bootstrap";

const Login = () => {
  return (
    <Container className="mt-5">
      <h2>Login</h2>
      <Form>
        <Stack gap={2}>
          <Form.Group controlId="username">
            <Form.Label> User name:</Form.Label>
            <Form.Control placeholder="Last Name" variant="text" />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control placeholder="password" type="password" />
          </Form.Group>
        </Stack>
      </Form>
    </Container>
  );
};

export default Login;
