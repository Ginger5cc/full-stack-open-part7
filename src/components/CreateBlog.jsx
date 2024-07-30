import { useState, useRef } from 'react'
import React from 'react'
import { useDispatch } from 'react-redux'

import { changeMessage } from '../reducers/messageReducer'
import { createBlog } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'

const CreateBlogForm = ({ blogFormRef }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const dispatch = useDispatch()


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


    const createa = (event) => {
        event.preventDefault()
        handleCreate({ title, author, url })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <Form onSubmit={createa}>
            <Form.Group>
                <Form.Label>Title:</Form.Label>
                <Form.Control
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                    placeholder="Title"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Author:</Form.Label>
                <Form.Control
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                    placeholder="Author"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Url:</Form.Label>
                <Form.Control
                    type="text"
                    value={url}
                    name="Url"
                    onChange={({ target }) => setUrl(target.value)}
                    placeholder="Url"
                />
            </Form.Group>
            <Button variant="primary" type="submit">create</Button>
        </Form>
    )
}
export default CreateBlogForm
