import React from 'react'
import likeIcon from '../assets/likeIcon.svg'
import unlikeIcon from '../assets/unlikeIcon.svg'
const LikeIcon = ({ state, setState }) => {
  return (
    <img
      src={state ? likeIcon : unlikeIcon}
      alt=''
      style={{ width: '35px', aspectRatio: '1' }}
      onClick={() => setState(true)}
    />
  )
}
export default LikeIcon
