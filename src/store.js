import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
import messageReducer from './reducers/messageReducer'
import userReducer from './reducers/userReducer'
import userlistReducer from './reducers/userlistReducer'

const store = configureStore({
    reducer: {
        blogs: blogReducer,
        message: messageReducer,
        user: userReducer,
        userlist: userlistReducer
    }
})


export default store