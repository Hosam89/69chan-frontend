import { Card, Button, Stack } from 'react-bootstrap'
import './PostCard.css'
import { Link } from 'react-router-dom'
import LikeIcon from './LikeIcon'
import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

const PostCard = ({
  imageUrl,
  title,
  description,
  postId,
  tags,
  likeNumber,
}) => {
  const [like, setLike] = useState(false)
  const { user } = useAuthContext()
  const truncateDescription = (desc, wordLimit) => {
    const words = desc.split(' ')
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...'
    }
    return desc
  }

  const handleLike = async (userId, postId) => {
    try {
      await fetch('http://localhost:3001/posts/like', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          userId,
        }),
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Card className='postContainer mb-2 '>
      <Card.Img variant='top' src={imageUrl} />

      <Card.Body>
        <Card.Title>{truncateDescription(title, 4)}</Card.Title>
        <Card.Text>
          <p>{truncateDescription(description, 4)}</p>
          <p>
            {tags &&
              tags[0]?.split(',').map((tag) => (
                <span className='ms-1' key={postId}>
                  #{tag}
                </span>
              ))}
          </p>
        </Card.Text>
      </Card.Body>
      <Stack
        gap={2}
        direction='horizontal'
        className='button-body justify-content-between'
      >
        <Link to={`/post/${postId}`}>
          <Button variant='primary'>More...</Button>
        </Link>
        <Stack gap={2} direction='horizontal'>
          <span>{likeNumber}</span>
          <button onClick={() => handleLike(postId, user.id)} disabled={like}>
            <LikeIcon state={like} setState={setLike} likeNumber={likeNumber} />
          </button>
        </Stack>
      </Stack>
    </Card>
  )
}

export default PostCard
