import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { notificationReducer } from './reducers/notificationReducer'
import { userLogin, userReducer } from './reducers/userReducer'

import blogService from './services/blogs'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogView from './components/BlogView'
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

const App = () => {
    const user = useSelector(state => state.user)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(userReducer(user))
            blogService.setToken(user.token)
        }
    }, [])

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

    return (
        <div>
            <nav id='topnav' style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Link to={'/blogs'}>blogs</Link>
                <Link to={'/users'}>users</Link>
                <form onSubmit={handleLogout}>
                    <p>
                        {user.name} logged in
                        <button id='logout' type='submit'>logout</button>
                    </p>
                </form>
            </nav>
            <h2>blog app</h2>
            <Notification />

            <Routes>
                <Route
                    path='/' element={<BlogList user={user} />}
                />
                <Route
                    path='/blogs' element={<BlogList user={user} />}
                />
                <Route
                    path='/blogs/:id' element={<BlogView />}
                />
                <Route path='/users/:id' element={<User />} />
                <Route path='/users' element={<Users /> } />
            </Routes>
        </div>
    )
}

export default App