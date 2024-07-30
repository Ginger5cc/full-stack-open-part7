import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import loginService from '../services/login'
import blogService from '../services/blogs'
import { changeMessage } from '../reducers/messageReducer'
import { loginUser } from '../reducers/userReducer'
import { Button } from 'react-bootstrap'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username,
                password,
            })
            window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
            blogService.setToken(user.token)
            dispatch(loginUser(user))
            setUsername('')
            setPassword('')
        } catch (exception) {
            dispatch(changeMessage({ content: 'Wrong credentials', type: 'error' }))
            setTimeout(() => {
                dispatch(changeMessage(null))
            }, 5000)
        }
    }

    return (
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
            <Button variant="primary" type="submit">login</Button>
        </form>
    )
}

export default LoginForm