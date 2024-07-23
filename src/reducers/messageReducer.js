import { createSlice } from '@reduxjs/toolkit'

const initialState = null
const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        changeMessage(state, action) {
            return action.payload
        },
    },
})

export const { changeMessage } = messageSlice.actions
export default messageSlice.reducer