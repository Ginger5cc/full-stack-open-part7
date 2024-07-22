import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import blogReducer from './reducers/blogReducer'
import messageReducer from './reducers/messageReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    message: messageReducer
  }
})

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)