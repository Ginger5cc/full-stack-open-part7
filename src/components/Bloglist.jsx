import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CreateBlogForm from '../components/CreateBlog'
import Togglable from '../components/Togglable'
import { Routes, Route, Link } from 'react-router-dom'
import Blog from './Blog'


const Bloglist = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const blogFormRef = useRef()

    const sort = [...blogs].sort((a, b) => b.likes - a.likes)

    return (
        <>
            <h2>Blog App</h2>
            <Togglable buttonLabel="create a blog" ref={blogFormRef}>
                <CreateBlogForm blogFormRef={blogFormRef}/>
            </Togglable>
            <p></p>
            {sort.map(blog => <div key={blog.id} className='bloglist'>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </div>)}

        </>
    )
}

export default Bloglist