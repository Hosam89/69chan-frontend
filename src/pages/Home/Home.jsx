import { useEffect } from 'react'
import { PostCard } from '../../components/index'
import { useFetch } from '../../hooks/useFetch'
import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Loader } from '../../components/index'
import './Home.css'
import { useWindowSize } from '../../hooks/useWindowSize'
import { Form } from 'react-bootstrap'

const Home = () => {
  const { user } = useAuthContext()
  const size = useWindowSize()
  const [search, setSearch] = useState('')
  const fetchUrl = `http://localhost:3001/posts${
    search ? `/?tag=${search}` : ''
  }`
  const { data, isPending, error } = useFetch(fetchUrl)

  const [post, setPost] = useState([])
  const updateLike = async (id, likes) => {
    try {
      const respones = await fetch(`http://localhost:3001/posts/patch/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ likes: user._id }),
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
    <div className={`${size.width < 551 ? ' mobileView' : ' homeContainer'} `}>
      <h1 className='text-center'>Your Feed</h1>
      <input type='text' onChange={(e) => setSearch(e.target.value)} />
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
                likeNumber={post?.likes?.length}
                updateLike={updateLike}
              />
            ))
            .reverse()}
        {isPending && <Loader />}
        {error && <div>{error}</div>}
      </div>
    </div>
  )
}

export default Home
