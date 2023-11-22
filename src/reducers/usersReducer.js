import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        usersReducer(state, action) {
            return action.payload
        }
    }
})

export const { usersReducer } = usersSlice.actions

export const fetchUsers = () => {
    return async dispatch => {
        const users = await usersService.getAll()
        dispatch(usersReducer(users))
    }
}

export default usersSlice.reducer