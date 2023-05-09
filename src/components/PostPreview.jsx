import React from 'react'
import imagePlaceHolder from '../assets/no_image_placeholder.png'
import './PostPreview.css'

const PostPreview = ({ imgUrl, title, description, tags }) => {
  return (
    <div className='postPreview mt-4'>
      <div className='text-center'>
        <img src={imgUrl ? imgUrl : imagePlaceHolder} alt='' />
      </div>
      <h3 className='mt-3'>{title}</h3>
      <div className='mt-3'>
        <p>{description}</p>
      </div>
      <ul>{tags && tags?.map((tag) => <li>#{tag}</li>)}</ul>
    </div>
  )
}

export default PostPreview
