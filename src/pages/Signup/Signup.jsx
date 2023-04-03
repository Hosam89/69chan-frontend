import React from "react";
import { Button, Col, Container, Form, Stack } from "react-bootstrap";
import { BsGoogle } from "react-icons/bs";
import { AiFillFacebook } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import "./Signup.css";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <Container className="pt-5">
      <h2 className="text-center">Sign Up</h2>
      <Stack className="pt-5" gap={5} direction="horizontal">
        <Col>
          <Form className="mt-5">
            <Stack gap={4}>
              <Form.Group controlId="fName">
                <Form.Label>First Name:</Form.Label>
                <Form.Control placeholder="First Name" />
              </Form.Group>
              <Form.Group controlId="lname">
                <Form.Label>Last Name:</Form.Label>
                <Form.Control placeholder="Last Name" variant="text" />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control placeholder="Email" type="email" />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control placeholder="password" type="password" />
              </Form.Group>
              <Form.Group controlId="repeatpass">
                <Form.Label>Repeat Password:</Form.Label>
                <Form.Control placeholder="Repeat Password" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control placeholder="Email" />
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
          </Form>
        </Col>
        <Col className="pt-5 autosingup d-flex ">
          <Stack
            gap={4}
            direction="vertical"
            className="d-flex justify-content-center align-items-center"
          >
            <Button className="btn google">
              <BsGoogle /> Google
            </Button>
            <Button className="btn facebook">
              {" "}
              <AiFillFacebook /> Face Book
            </Button>
            <Button className="btn github">
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
