import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { notificationReducer } from './reducers/notificationReducer'

import { initializeBlogs, createBlog } from './reducers/blogsReducer'

import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
    const blogs = useSelector(state => state.blogs)
    const [sortedBlogs, setSortedBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const dispatch = useDispatch()
    const blogFormRef = useRef()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
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
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
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
        setUser(null)
    }

    const handleLikeBlog = async (blogObject) => {
        try {
            const returnedBlog = await blogService.update(blogObject.id, blogObject)
            const updatedBlogs = blogs.map((blog) =>
                blog.id === returnedBlog.id ? returnedBlog : blog
            )
            setBlogs(updatedBlogs)
        } catch {null}
    }

    const handleDeleteBlog = async (blogObject) => {
        try {
            await blogService.remove(blogObject.id)
            const updatedBlogs = blogs.filter((blog) => blog.id !== blogObject.id)
            setBlogs(updatedBlogs)
        } catch {null}
    }

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
            {blogForm()}
            <div>
                {sortedBlogs.map(blog =>
                    <Blog key={blog.id} blog={blog} likeBlog={handleLikeBlog} deleteBlog={handleDeleteBlog} loggedUser={user} />
                )}
            </div>
        </div>
    )
}

export default App