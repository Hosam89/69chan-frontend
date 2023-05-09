import { Card, Button } from 'react-bootstrap'

import './PostCard.css'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

const PostCard = ({
  imageUrl,
  title,
  description,
  postId,
  userName,
  userId,
}) => {
  return (
    <Card className='postContainer mb-3 col-lg-3 '>
      <Card.Img variant='top' src={imageUrl} />

      <Card.Body>
        <Card.Title>
          {title} {userName}
        </Card.Title>
        <Card.Text>{description}</Card.Text>
        <Link to={`/post/${postId}`}>
          <Button variant='primary'>see More</Button>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default PostCard
