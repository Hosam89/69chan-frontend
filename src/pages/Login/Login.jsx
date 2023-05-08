import React from 'react'
import { Button, Container, Form, Stack } from 'react-bootstrap'
import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Link, useNavigate } from 'react-router-dom'
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
      generateError(error.message)
    }
  }
  return (
    <>
      <Container className='mt-5 login'>
        <h2 className='header-login'>Login to MemeJewels</h2>
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
          <Button variant='primary' className='mt-5 btn btn-info' type='submit'>
            Login
          </Button>
        </Form>
        <span>
          you don't have an Account with us ? <Link to='/signup'>Signup</Link>
        </span>
      </Container>
      <ToastContainer />
    </>
  )
}

export default Login
