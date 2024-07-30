import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const User = () => {
    let userlist = useSelector( state => state.userlist)
    const id = useParams().id
    const user = userlist.find(n => n.id === id)

    if (!user) {
        return null
    }
    return (
        <div>
            <h2>{user.username}</h2>
            <p>added blogs</p>
            <ul>
                {user.blogs.map( n => <li key={n.id}>
                    <Link to={`/blogs/${n.id}`}>{n.title}</Link>
                </li>)}
            </ul>
        </div>
    )
}

export default User