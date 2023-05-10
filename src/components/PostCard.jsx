import { Card, Button, Stack } from 'react-bootstrap'
import './PostCard.css'
import { Link } from 'react-router-dom'
import LikeIcon from './LikeIcon'
import { useState } from 'react'

const PostCard = ({
  imageUrl,
  title,
  description,
  postId,
  tags,
  likeNumber,
  updateLike,
}) => {
  const [like, setLike] = useState(false)

  return (
    <Card className='postContainer mb-2 '>
      <Card.Img variant='top' src={imageUrl} />

      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {' '}
          <p>{description}</p>{' '}
          <p>
            {tags &&
              tags[0]
                ?.split(',')
                .map((tag) => <span className='ms-1'>#{tag}</span>)}
          </p>
        </Card.Text>
      </Card.Body>
      <Stack
        gap={2}
        direction='horizontal'
        className='button-body justify-content-between'
      >
        <Link to={`/post/${postId}`}>
          <Button variant='primary'>see More</Button>
        </Link>
        <Stack gap={2} direction='horizontal'>
          <span>{likeNumber}</span>{' '}
          <span onClick={() => updateLike(postId, likeNumber)}>
            <LikeIcon state={like} setState={setLike} likeNumber={likeNumber} />
          </span>
        </Stack>
        {/* <button onClick={() => updateLike()}>like me</button> */}
      </Stack>
    </Card>
  )
}

export default PostCard
