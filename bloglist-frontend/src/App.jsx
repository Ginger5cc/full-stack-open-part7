import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import blogService from './services/blogs'
import Notification from './components/Notifications'
import Bloglist from './components/Bloglist'

import { initializeBlogs } from './reducers/blogReducer'
import { loginUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/userlistReducer'

import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'

import { Button } from 'react-bootstrap'


import {
    BrowserRouter as Router,
    Routes, Route, Link
} from 'react-router-dom'
import { initializeComments } from './reducers/commentlistReducer'


const App = () => {
    const dispatch = useDispatch()
    const bloglist = useSelector(state => state.blogs)

    useEffect ( () => {
        dispatch(initializeBlogs())
    },[])

    useEffect ( () => {
        dispatch(initializeUsers())
    },[bloglist])

    useEffect ( () => {
        dispatch(initializeComments())
    },[])


    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(loginUser(user))
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogout = () => {
        window.localStorage.removeItem('loggedNoteappUser')
        dispatch(loginUser(null))
    }

    const user = useSelector(state => state.user)
    if (user === null) {
        return (
            <div>
                <h2>Log in to application</h2>
                <Notification />
                <LoginForm />
            </div>
        )
    }

    return (
        <div className='container'>
            <h2>Blogs</h2>
            <Notification />
            <form onSubmit={handleLogout}>
                <div>
                    <Link className='menuItem' to="/blogs">blogs</Link>
                    <Link className='menuItem' to="/users">users</Link>
                    {user.username} logged in <Button variant="primary" type="submit">logout</Button>
                </div>
            </form>

            <Routes>
                <Route path="/users/:id" element={<User />} />
                <Route path="/blogs/:id" element={<Blog />} />
                <Route path="/blogs/" element={<Bloglist />} />
                <Route path="/users/" element={<Users />} />
            </Routes>
        </div>
    )
}

export default App
