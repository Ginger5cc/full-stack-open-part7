import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const User = () => {
    let userlist = useSelector( state => state.userlist)
    const id = useParams().id
    console.log('id is', id)
    const user = userlist.find(n => n.id === id)
    console.log('userlist is', userlist)
    console.log('user is', user)
    if (!user) {
        return null
    }
    return (
        <div>
            <h2>{user.username}</h2>
            <p>added blogs</p>
            <ul>
                {user.blogs.map( n => <li key={n.id}>{ n.title }</li>)}
            </ul>
        </div>
    )
 
}

export default User