import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []
const commentSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        appendComment(state, action) {
            state.push(action.payload)
        },
        setComment(state, action) {
            return action.payload
        },
    },
})

export const { appendComment, setComment } = commentSlice.actions
export default commentSlice.reducer

export const initializeComments = () => {
    return async dispatch => {
        const commentlist = await blogService.getAllComment()
        dispatch(setComment(commentlist))
    }
}

export const createComment = (id, content) => {
    return async dispatch => {
        const newComment = await blogService.comment(id, content)
        console.log(newComment)
        dispatch(appendComment(newComment))
    }
}