import { useState, useRef } from 'react'
import React from 'react'
import { useDispatch } from 'react-redux'

import { changeMessage } from '../reducers/messageReducer'
import { createBlog } from '../reducers/blogReducer'

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
        <form onSubmit={createa}>
            <div>
        title:
                <input
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                    placeholder="Title"
                    data-testid="title"
                />
            </div>
            <div>
        author:
                <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                    placeholder="Author"
                    data-testid="author"
                />
            </div>
            <div>
        url:
                <input
                    type="text"
                    value={url}
                    name="Url"
                    onChange={({ target }) => setUrl(target.value)}
                    placeholder="Url"
                    data-testid="url"
                />
            </div>
            <button type="submit">create</button>
        </form>
    )
}
export default CreateBlogForm
