import { useDispatch, useSelector } from 'react-redux'
import {
    BrowserRouter as Router,
    Routes, Route, Link, useParams
} from 'react-router-dom'
import User from './User'

const Users = () => {
    let userlist = useSelector(state => state.userlist)
    if (!userlist) {
        return null
    }
    return (
        <>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {userlist.map( (n, idx ) =>
                        <tr key={idx}>
                            <td><Link to={`/users/${n.id}`}>{n.username}</Link></td>
                            <td>{n.blogs.length}</td>
                        </tr>)}
                </tbody>
            </table>
        </>
    )
}

export default Users