import React from 'react'
import { Button, Col, Container, Form, Stack } from 'react-bootstrap'
import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { BsGoogle } from 'react-icons/bs'
import { AiFillFacebook } from 'react-icons/ai'
import { FaGithub } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'

import './Login.css'

const Login = () => {
  const { dispatch } = useAuthContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const generateError = (err) =>
    toast.error(err, {
      position: 'top-center',
    })
  const handleLogIn = async (e) => {
    e.preventDefault()
    const userlogin = {
      email,
      password,
    }
    try {
      const response = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        body: JSON.stringify(userlogin),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log(response)

      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const data = await response.json()
      setTimeout(() => {
        dispatch({ type: 'LOGIN', payload: data })
        navigate('/')
      }, 2000)
    } catch (error) {
      console.log(error)
      generateError(error.message)
    }
  }
  return (
    <>
      <Container className='mt-5 login'>
        <h2 className='header-login text-center header'>
          NeonNet: Where Retro Meets Digital!
        </h2>
        <Stack className='pt-5' gap={5} direction='horizontal'>
          <Col>
            <Form onSubmit={(e) => handleLogIn(e)}>
              <Stack gap={2}>
                <Form.Group controlId='username'>
                  <Form.Label> User Email:</Form.Label>
                  <Form.Control
                    placeholder='Email'
                    variant='email'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='password'>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    placeholder='password'
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
              </Stack>
              <Button
                variant='primary'
                className='mt-5 btn btn-info'
                type='submit'
              >
                Login
              </Button>
            </Form>
            <span>
              Don't have an account yet ? <Link to='/signup'>Signup</Link>
            </span>
          </Col>
          <Col className='pt-5 autosingup d-flex '>
            <Stack
              gap={4}
              direction='vertical'
              className='d-flex justify-content-center align-items-center'
            >
              <Button className='btn btn-danger google block'>
                <BsGoogle /> Google
              </Button>
              <Button className='btn btn-info facebook block'>
                {' '}
                <AiFillFacebook /> Facebook
              </Button>
              <Button className='btn btn-dark github block'>
                {' '}
                <FaGithub /> Github
              </Button>
            </Stack>
          </Col>
        </Stack>
      </Container>
      <ToastContainer />
    </>
  )
}

export default Login
