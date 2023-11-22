import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { notificationReducer } from './reducers/notificationReducer'

import { initializeBlogs } from './reducers/blogsReducer'
import { userLogin, userReducer } from './reducers/userReducer'

import Blog from './components/Blog'
import blogService from './services/blogs'

import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import User from './components/User'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useNavigate,
    useMatch
} from 'react-router-dom'

const BlogList = ({ sortedBlogs, user, blogForm }) => (
    <div>
        {blogForm()}
        {sortedBlogs.map(blog =>
            <Blog key={blog.id} blog={blog} loggedUser={user} />
        )}
    </div>
)

const App = () => {
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)
    const users = useSelector(state => state.users)
    const [sortedBlogs, setSortedBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const blogFormRef = useRef()

    useEffect(() => {
        dispatch(initializeBlogs())
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(userReducer(user))
            blogService.setToken(user.token)
        }
    }, [])

    useEffect(() => {
        const blogsSortedByLikes = blogs.slice().sort((a, b) => b.likes - a.likes)
        setSortedBlogs(blogsSortedByLikes)
    }, [blogs])

    const handleCreateBlog = () => {
        blogFormRef.current.toggleVisibility()
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            dispatch(userLogin({ username, password }))
            setUsername('')
            setPassword('')

            dispatch(notificationReducer({ message: 'Successful login', type: 'success' }))
        } catch (exception) {
            dispatch(notificationReducer({ message: 'Wrong credentials', type: 'error' }))
        }
    }

    const handleLogout = (event) => {
        event.preventDefault()

        window.localStorage.removeItem('loggedBlogappUser')
        dispatch(userReducer(null))
    }

    // const match = useMatch('/users/:id')
    // const showUser = match
    //     ? users.find(user => user.id === Number(match.params.id))
    //     : null

    if (user === null) {
        return (
            <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleLogin={handleLogin}
            />
        )
    }

    const blogForm = () => (
        <Togglable buttonId='newBlog' buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm toggleVisibility={handleCreateBlog} />
        </Togglable>
    )

    return (
        <div>
            <h2>blogs</h2>
            <Notification />
            <form onSubmit={handleLogout}>
                <p>
                    {user.name} logged in
                    <button id='logout' type='submit'>logout</button>
                </p>
            </form>

            <Router>
                <Routes>
                    <Route
                        path='/' element={<BlogList sortedBlogs={sortedBlogs} user={user} blogForm={blogForm} />}
                    />
                    <Route
                        path='/blogs' element={<BlogList sortedBlogs={sortedBlogs} user={user} blogForm={blogForm} />}
                    />
                    <Route path='/users/:id' element={<User />} />
                    <Route path='/users' element={<Users /> } />
                </Routes>
            </Router>
        </div>
    )
}

export default App