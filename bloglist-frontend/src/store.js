import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import blogReducer from './reducers/blogReducer'
import messageReducer from './reducers/messageReducer'
import userReducer from './reducers/userReducer'
import userlistReducer from './reducers/userlistReducer'
import commentlistReducer from './reducers/commentlistReducer'
import { combineReducers } from 'redux'

const reducers = combineReducers({
    blogs: blogReducer,
    message: messageReducer,
    user: userReducer,
    userlist: userlistReducer,
    commentlist: commentlistReducer
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)


const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false, }),
})



export default store