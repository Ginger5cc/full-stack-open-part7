import { useState } from "react"

const Blog = ({ blog }) => {
  const [showMore, setShowMore] = useState(false) 
  
  const toggle = () => {
    setShowMore(!showMore)
  }

  let hideWhenShow = {display: showMore ? 'none' : ''}
  let showWhenShow = {display: showMore ? '' : 'none'}
  
  return (
    <div>
      <div style={hideWhenShow} className='bloglist'>
        {blog.title} 
        <button onClick={toggle}>View</button>
      </div>  
      <div style={showWhenShow} className='bloglist'>
        <p>{blog.title}<button onClick={toggle}>hide</button></p>
        <p>{blog.url}</p>
        <p>{blog.likes} <button>like</button> </p>
        <p>{blog.author}</p> 
        
      </div>  
    </div>
  )
}

export default Blog