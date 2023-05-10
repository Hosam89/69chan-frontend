import React, { useState } from 'react'
import { Button, Col, Container, Form, Stack } from 'react-bootstrap'
import { BsGoogle } from 'react-icons/bs'
import { AiFillFacebook } from 'react-icons/ai'
import { FaGithub } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

import './Signup.css'
import { ToastContainer, toast } from 'react-toastify'

const Signup = () => {
  //User state Data
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [profilePicture, setProfilePicture] = useState(null)
  //Error when the Picture is not valid
  const [profilePictureError, setProfilePictureError] = useState('')

  //state for the icons to hide and show password
  const [showPassword, setShowPassword] = useState(true)
  const [showRepeatPassword, setShowRepeatPassword] = useState(true)
  const navigate = useNavigate()
  const { postData, error } = useFetch(
    'http://localhost:3001/users/add',
    'POST',
    'LOGIN'
  )

  const generateError = (err) =>
    toast.error(err, {
      position: 'top-right',
    })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = {
      email,
      password,
      name,
      username,
      profilePicture,
    }
    if (password !== repeatPassword && !profilePictureError) {
      generateError('Password dose not match')
    } else {
      postData(user)

      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }

  /** A function to check the type the size of the user Pic */
  const handleFileChange = (e) => {
    /** A clean up to the input type file so it will only take the last file we upload */
    setProfilePicture(null)

    let selected = e.target.files[0]

    if (!selected) {
      generateError('Please select an image file')
      return
    }
    /** To check if the file uploaded is an Image or not */
    if (!selected.type.includes('image')) {
      generateError('The File must be an image')
      return
    }
    /** To check to file size */
    if (selected.size > 900000) {
      generateError('Image file must be less than 100kb')
      return
    }
    setProfilePictureError(null)
    setProfilePicture(selected)
    console.log('thumbnail updated')
  }

  return (
    <>
      <Container className='pt-5 signup'>
        <h2 className='text-center header'>
          NeonNet: Where Retro Meets Digital!
        </h2>
        <Stack className='pt-5' gap={5} direction='horizontal'>
          <Col>
            <Form className='mt-5' onSubmit={(e) => handleSubmit(e)}>
              <Stack gap={4}>
                <Form.Group controlId='username'>
                  <Form.Label> Username:</Form.Label>
                  <Form.Control
                    placeholder='User Name'
                    variant='text'
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='name'>
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    placeholder='Full Name'
                    variant='text'
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='email'>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    placeholder='Email'
                    type='email'
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='password' id='password'>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    placeholder='password'
                    type={showPassword ? 'password' : 'text'}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {showPassword ? (
                    <AiOutlineEye
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </Form.Group>
                <Form.Group controlId='repeatpass' id='repeatPassword'>
                  <Form.Label>Repeat Password:</Form.Label>
                  <Form.Control
                    placeholder='Repeat Password'
                    type={showRepeatPassword ? 'password' : 'text'}
                    required
                    onChange={(e) => setRepeatPassword(e.target.value)}
                  />
                  {showRepeatPassword ? (
                    <AiOutlineEye
                      onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                    />
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Photo:</Form.Label>
                  <Form.Control
                    placeholder='photo'
                    type='file'
                    required
                    onChange={handleFileChange}
                  />
                </Form.Group>
              </Stack>
              <Stack
                gap={2}
                direction='horizontal'
                className='justify-content-end mt-4'
              >
                <Button className='btn btn-info' type='submit'>
                  Signup
                </Button>
                <Link to='/login'>
                  <Button variant=' btn btn-success'>Login</Button>
                </Link>
              </Stack>
            </Form>
          </Col>
          <Col className='pt-5 autosingup d-flex '>
            <Stack
              gap={4}
              direction='vertical'
              className='d-flex justify-content-center align-items-center'
            >
              <Button className='btn btn-primary google block'>
                <BsGoogle /> Google
              </Button>
              <Button className='btn btn-secondary facebook block'>
                {' '}
                <AiFillFacebook /> Facebook
              </Button>
              <Button className='btn btn-success github block'>
                {' '}
                <FaGithub /> Github
              </Button>
            </Stack>
          </Col>
        </Stack>
        <ToastContainer />
      </Container>
    </>
  )
}

export default Signup
