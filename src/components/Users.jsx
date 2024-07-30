import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'


const Users = () => {
    let userlist = useSelector(state => state.userlist)
    userlist = userlist.filter( n => n.username !== 'root' )
    if (!userlist) {
        return null
    }
    return (
        <>
            <h2>Users</h2>
            <Table striped>
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
                        </tr>
                    )
                    }
                </tbody>
            </Table>
        </>
    )
}

export default Users