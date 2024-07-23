import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser(state, action) {
            return action.payload
        }
    }
})


export const { loginUser } = userSlice.actions
export default userSlice.reducer