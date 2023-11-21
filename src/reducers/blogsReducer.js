import { createSlice } from "@reduxjs/toolkit"
import blogsService from '../services/blogs'

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        updateBlogs(state, action) {
            return state.map(blog =>
                blog.id !== action.payload.id ? blog : action.payload
            )
        }
    }
})

export const { setBlogs, appendBlog, updateBlogs } = blogsSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogsService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = ({ title, author, url }) => {
    const blogObject = {
        title,
        author,
        url
    }
    return async dispatch => {
        try {
            const newBlog = await blogsService.create(blogObject)
            dispatch(appendBlog(newBlog))
        } catch (error) {
            console.error('Error creating blog:', error)
        }
    }
}

export const likeBlog = id => {
    return async dispatch => {
        const likedBlog = await blogsService.like(id)
        dispatch(updateBlogs(likedBlog))
    }
}

export default blogsSlice.reducer
