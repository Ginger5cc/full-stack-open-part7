import { useState } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { changeMessage } from '../reducers/messageReducer'
import { deleteBlog, addLike } from '../reducers/blogReducer'
import { createComment } from '../reducers/commentlistReducer'

const Blog = () => {
    const id = useParams().id
    const dispatch = useDispatch()
    const user  = useSelector(state => state.user)
    const bloglist  = useSelector(state => state.blogs)
    const blog = bloglist.find(n => n.id === id)
    const [content, setContent] = useState('')
    const commentlist  = useSelector(state => state.commentlist)
    const comment = commentlist.filter(n => n.blogid === id)

    const commentClick = () => {
        console.log('click add commet')
        const newComment = {
            content: content,
            blogid: blog.id
        }
        setContent('')
        try {
            dispatch(createComment(blog.id, newComment))
        } catch (error) {
            console.error(error.response.data)
            dispatch(changeMessage({ content: 'cannot add comment', type: 'error' }))
            setTimeout(() => {
                dispatch(changeMessage(null))
            }, 5000)
        }
    }

    const likeClick = () => {
        const blogAddlike = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
        }
        handleUpdate(id, blogAddlike)
    }

    const removeClick = () => {
        if (window.confirm(`remove ${blog.title} by ${blog.author}`)) {
            handleRemove(id, blog)
        }
    }

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

    let sameUser = { display: user.id === blog.user.id ? '' : 'none' }

    const getClickableLink = link => {
        return link.startsWith('http://') || link.startsWith('https://') ?
            link
            : `http://${link}`
    }

    return (
        <>
            <div className='bloglist'>
                <h2>{blog.title} by {blog.author}</h2>
                <a target='_blank' rel='noopener noreferrer' href={getClickableLink(blog.url)} >{blog.url}</a>
                <p className="likeField">
                    {blog.likes}
                    <button onClick={likeClick}>
                like
                    </button>
                </p>
                <p>added by {blog.user.name}</p>
                <button
                    style={sameUser}
                    onClick={removeClick}>
                        remove
                </button>
            </div>
            <div className='bloglist'>
                <h3>comments</h3>
                <div>
                    <input
                        type="text"
                        value={content}
                        name="Comment"
                        onChange={({ target }) => setContent(target.value)}
                    />
                    <button onClick={commentClick} >add comment</button>
                </div>
                <div>
                    {comment? comment.map( n => <li key={n.id}>{n.content}</li>) : null}
                </div>
            </div>
        </>
    )
}

export default Blog
