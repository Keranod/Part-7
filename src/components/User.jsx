import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchUsers } from '../reducers/usersReducer'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useNavigate,
    useMatch
} from 'react-router-dom'

const User = () => {
    const users = useSelector(state => state.users)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    const match = useMatch('/users/:id')

    const userId = match.params.id

    const showUser = match
        ? users.find(user => user.id === userId)
        : null


    const blogs = showUser?.blogs || []

    if (!showUser) {
        return null
    }

    if (blogs.length === 0) {
        return null
    }

    return (
        <div>
            <h1>{showUser.name}</h1>
            <h3>added blogs</h3>
            <ul>
                {blogs.map(blog =>
                    <li key={blog.id}>
                        {blog.title}
                    </li>
                )}
            </ul>
        </div>
    )
}

export default User