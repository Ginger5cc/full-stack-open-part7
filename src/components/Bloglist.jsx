import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import { changeMessage } from '../reducers/messageReducer'
import blogService from '../services/blogs'
import { deleteBlog, addLike } from '../reducers/blogReducer'



const Bloglist = ({ user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const sort = [...blogs].sort((a, b) => b.likes - a.likes)


  const handleRemove = async (id, blogObject) => {
    try {
      dispatch(deleteBlog(id))
      dispatch(changeMessage({
        content: `Deleted ${blogObject.title}`,
        type: 'notice',
      }))
      setTimeout(() => {
        dispatch(changeMessage(null))
      }, 5000)
    } catch (error) {
      console.error(error.response.data)
      dispatch(changeMessage({ content: 'cannot delete', type: 'error' }))
      setTimeout(() => {
        dispatch(changeMessage(null))
      }, 5000)
    }
  }

  const handleUpdate = async (id, blogObject) => {
    try {

      dispatch(addLike(id, blogObject))
      dispatch(changeMessage({
        content: `like ${blogObject.title}`,
        type: 'notice',
      }))
      setTimeout(() => {
        dispatch(changeMessage(null))
      }, 5000)
    } catch (exception) {
      console.log(exception)
      dispatch(changeMessage({ content: exception.message, type: 'error' }))
      setTimeout(() => {
        dispatch(changeMessage(null))
      }, 5000)
    }
  }
  return (
    <>
      {sort.map( blog => <Blog key={blog.id} blog={blog} remove={handleRemove} addLike={handleUpdate} user={user} />)}
    </>
  )
}

export default Bloglist