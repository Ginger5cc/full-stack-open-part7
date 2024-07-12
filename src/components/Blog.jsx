import { useState } from 'react'
import React from 'react'

const Blog = ({ blog, addLike, remove }) => {
  const [showMore, setShowMore] = useState(false)

  const toggle = () => {
    setShowMore(!showMore)
  }

  const likeClick = () => {
    const blogAddlike = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    addLike(blog.id, blogAddlike)
  }

  const removeClick = () => {
    if (window.confirm(`remove ${blog.title} by ${blog.author}`)) {remove(blog.id, blog)}

  }

  let hideWhenShow = { display: showMore ? 'none' : '' }
  let showWhenShow = { display: showMore ? '' : 'none' }

  //in case no user is found in a blog
  return (
    <div data-testid='toggleElement'>
      <div style={hideWhenShow} className='bloglist' data-testid='toggleShow'>
        {blog.title} by {blog.author}
        <button onClick={toggle}>View</button>
      </div>
      <div style={showWhenShow} className='bloglist' data-testid='toggleHide'>
        <p>{blog.title}<button onClick={toggle}>hide</button></p>
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={likeClick}>like</button> </p>
        <p>{blog.user.name}</p>
        <button onClick={removeClick}>remove</button>
      </div>
    </div>
  )
}

export default Blog