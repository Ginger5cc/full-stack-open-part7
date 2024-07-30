import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const initialState = null

const userlistSlice = createSlice({
    name: 'userlist',
    initialState,
    reducers: {
        appendUserlist(state, action) {
            state.push(action.payload)
        },
        setUserlist(state, action) {
            return action.payload
        },
    }
})


export const { appendUserlist, setUserlist } = userlistSlice.actions
export default userlistSlice.reducer

export const initializeUsers = () => {
    return async dispatch => {
        const userlist = await userService.getAll()
        dispatch(setUserlist(userlist))
    }
}