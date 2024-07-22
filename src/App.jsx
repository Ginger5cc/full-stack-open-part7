import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notifications'
import CreateBlogForm from './components/CreateBlog'
import Togglable from './components/Togglable'
import Bloglist from './components/Bloglist'

import { initializeBlogs } from './reducers/blogReducer'
import { changeMessage } from './reducers/messageReducer'
import { createBlog } from './reducers/blogReducer'

const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect ( () => {
    dispatch(initializeBlogs())
  },[])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(changeMessage({ content: 'Wrong credentials', type: 'error' }))
      setTimeout(() => {
        dispatch(changeMessage(null))
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username:
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          data-testid="username"
        />
      </div>
      <div>
        password:
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          data-testid="password"
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleCreate = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(blogObject))
      dispatch(changeMessage({
        content: `a new blog ${blogObject.title} by ${blogObject.author} added`,
        type: 'notice',
      }))
      setTimeout(() => {
        dispatch(changeMessage(null))
      }, 5000)
    } catch (exception) {
      console.log(exception)
      dispatch(changeMessage({ content: 'please log in again', type: 'error' }))
      setTimeout(() => {
        dispatch(changeMessage(null))
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <form onSubmit={handleLogout}>
        <p>
          {user.username} logged in <button type="submit">logout</button>
        </p>
      </form>
      <h2>Create New Blogs</h2>
      <Togglable buttonLabel="create a blog" ref={blogFormRef}>
        <CreateBlogForm create={handleCreate} />
      </Togglable>
      <p></p>
      <Bloglist user={user}/>
    </div>
  )
}

export default App
