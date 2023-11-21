import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState : {
        message: null,
        type: null
    },
    reducers: {
        notificationReducer(state, action) {
            const { message, type } = action.payload
            const newState = {
                message,
                type
            }
            return newState
        },
        nullNotificationType(state, action) {
            const newState = {
                ...state,
                message: null,
                type: null
            }
            console.log(newState)
            return newState
        }
    }
})

export const { notificationReducer, nullNotificationType } = notificationSlice.actions
export default notificationSlice.reducer
