import { useEffect } from 'react'
import { PostCard } from '../../components/index'
import { useFetch } from '../../hooks/useFetch'
import { useState } from 'react'

import './Home.css'

const Home = () => {
  const { data, isPending, error } = useFetch('http://localhost:3001/posts')
  const [post, setPost] = useState([])
  const updateLike = async (id, likes) => {
    try {
      const respones = await fetch(`http://localhost:3001/posts/patch/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ likes: likes + 1 }),
      })
      console.log('like response', respones)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPost(data)
    }, 500)

    // Clear the timeout when the component unmounts or when the data changes.
    return () => clearTimeout(timeoutId)
  }, [data])

  return (
    <div className='homeContainer mt-5'>
      <h1 className='text-center'>Your Feed</h1>
      <div className=' d-flex flex-wrap gap-3  justify-content-center'>
        {post &&
          post
            ?.map((post) => (
              <PostCard
                imageUrl={post.mediaUrl}
                title={post.title}
                description={post.description}
                postId={post._id}
                key={post._id}
                userName={post.userName}
                userId={post.user}
                tags={post.tags}
                likeNumber={post.likes}
              />
            ))
            .reverse()}
        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
      </div>
    </div>
  )
}

export default Home
