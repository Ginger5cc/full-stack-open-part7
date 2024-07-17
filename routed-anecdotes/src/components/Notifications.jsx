const Notification = ({ message }) => {

    
    if (message === '')
        return null
    return (
        <div>a new anecdote { message } created!</div>
    )
}

export default Notification