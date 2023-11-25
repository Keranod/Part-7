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

import styled from 'styled-components'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useNavigate,
    useMatch
} from 'react-router-dom'

import {
    StyledNavButton
} from './styles/NavBarStlyes'

const NavBarButton = styled.button`
    padding:10px;
    border: 2px solid blue;
    border-radius: 4px;
`

const NavBarLink = styled(Link)`
    appearance: none;
    background-color: #2ea44f;
    border: 1px solid rgba(27, 31, 35, .15);
    border-radius: 6px;
    box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    padding: 6px 16px;
    position: relative;
    text-align: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
    white-space: nowrap;
    &:focus:not(:focus-visible):not(.focus-visible) {
        box-shadow: none;
        outline: none;
    }
    &:hover {
        background-color: #2c974b;
    }
    &:focus {
        box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
        outline: none;
    }
    &:disabled {
        background-color: #94d3a2;
        border-color: rgba(27, 31, 35, .1);
        color: rgba(255, 255, 255, .8);
        cursor: default;
    }
    &:active {
        background-color: #298e46;
        box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
    }
`

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
            await dispatch(userLogin({ username, password }))
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
                <Link to={'/blogs'}><StyledNavButton>blogs</StyledNavButton></Link>
                <Link to={'/users'}><StyledNavButton>users</StyledNavButton></Link>
                <form onSubmit={handleLogout}>
                    <p>
                        <b>{user.name}</b> logged in
                        <StyledNavButton id='logout' type='submit'>logout</StyledNavButton>
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