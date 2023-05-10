import { useState } from 'react'
import { Form, Button, Container, Stack } from 'react-bootstrap'
import Select from 'react-select'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFetch } from '../../hooks/useFetch'
import { PostPreview } from '../../components/index'
import imagePlaceHoder from '../../assets/no_image_placeholder.png'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
const CreatePost = () => {
  const { user } = useAuthContext()

  //Post States
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [mediaUrl, setMediaUrl] = useState('')
  const [tags, setTags] = useState([])

  const [previewUrl, setPreviewUrl] = useState(null)

  //Tags Options
  //Navigate towrd home
  const navigate = useNavigate()
  //Post data Function
  const { postData, error } = useFetch(
    'http://localhost:3001/posts/add',
    'POST'
  )

  const generateError = (err) =>
    toast.error(err, {
      position: 'top-right',
    })
  //available Tags
  const availableTags = [
    { value: 'meme', label: 'Memes' },
    { value: 'question', label: 'Question' },
    { value: 'milf', label: 'Milf' },
    { value: 'gonewild', label: 'Gone Wild' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'travel', label: 'Travel' },
    { value: 'food', label: 'Food' },
    { value: 'music', label: 'Music' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    const post = {
      title,
      description,
      mediaUrl,
      tags,
      user: user._id,
      userName: user.name,
    }
    try {
      postData(post)
      setTimeout(() => {
        navigate('/')
      }, 1000)
    } catch (error) {
      generateError(error)
    }
  }

  /** A function to check the type the size of the user Pic */
  const handleFileChange = (e) => {
    /** A clean up to the input type file so it will only take the last file we upload */
    setMediaUrl(null)

    let selected = e.target.files[0]
    if (selected) {
      const reader = new FileReader()
      reader.onload = function () {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(selected)
    }
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
    if (selected.size > 3000000) {
      generateError('Image file must be less than 100kb')
      return
    }

    setMediaUrl(selected)
    console.log('thumbnail updated')
  }

  return (
    <Container className='homeContainer mt-5'>
      {/** Stack is like flex but easier to read and Understadn */}
      <Stack direction='horizontal' gap={2} className='justify-content-between'>
        <Form className='lg-col-6' onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className='mb-3' controlId='postTitle'>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Title'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='description'>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type='text'
              placeholder='What is the Story'
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Media:</Form.Label>
            <Form.Control type='file' onChange={handleFileChange} required />
            <Form.Text className='text-muted text-light'></Form.Text>
          </Form.Group>

          <Form.Label>Tags</Form.Label>
          <Select
            options={availableTags}
            isMulti
            onChange={(options) =>
              options?.forEach((option) =>
                setTags((pervOption) => [...pervOption, option.label])
              )
            }
          />

          <Button variant='primary' type='submit' className='mt-4'>
            Submit
          </Button>
        </Form>
        <div>
          <h4 className='text-center'>Post PreView</h4>
          <PostPreview
            title={title}
            description={description}
            imgUrl={previewUrl ? previewUrl : imagePlaceHoder}
            tags={tags}
          />
        </div>
      </Stack>
      <ToastContainer />
    </Container>
  )
}

export default CreatePost
