import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogsService from '../services/blogs'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        userReducer(state, action) {
            return action.payload
        }
    }
})

export const { userReducer } = userSlice.actions

export const userLogin = user => {
    return async dispatch => {
        const loggedInUser = await loginService.login(user)
        window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(loggedInUser)
        )
        blogsService.setToken(loggedInUser.token)
        dispatch(userReducer(loggedInUser))
    }
}

export default userSlice.reducer