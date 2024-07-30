import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []


const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        appendBlog(state, action) {
            state.push(action.payload)
        },
        setBlog(state, action) {
            return action.payload
        },
        removeBlog (state, action) {
            state = state.filter( n => n.id !== action.payload)
            console.log('payload is', action.payload)
            console.log('state is', state)
            return state
        },
        addLikeUpdate (state, action) {
            state.map( n => n.id === action.payload ? n.likes++ : n)
        },
    },
})

export const { appendBlog, setBlog, removeBlog, addLikeUpdate } = blogSlice.actions
export default blogSlice.reducer

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlog(blogs))
    }
}
export const createBlog = content => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        console.log(newBlog)
        dispatch(appendBlog(newBlog))
    }
}

export const deleteBlog = id => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch(removeBlog(id))
    }
}

export const addLike = (id, newContent) => {
    return async dispatch => {
        await blogService.update(id, newContent)
        dispatch(addLikeUpdate(id))
    }
}