/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { useDispatch } from 'react-redux'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useNavigate,
    useMatch
} from 'react-router-dom'

const Blog = ({ blog, loggedUser }) => {
    const [viewDetails, setViewDetails] = useState('none')
    const [showRemoveButton, setShowRemoveButton] = useState('none')

    const dispatch = useDispatch()

    useEffect(() => {
    //console.log('inside of useeffect')
        if (blog.user.username === loggedUser.username) {
            //console.log('inside of useffect loop')
            setShowRemoveButton('')
        }
    }, [])

    const toggleViewDetails = () => {
        if (viewDetails === 'none') {
            setViewDetails('')
        } else {
            setViewDetails('none')
        }
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const handleLikeBlog = async (blog) => {
        dispatch(likeBlog(blog.id))
    }

    const handleDeleteBlog = async (blog) => {
        if (window.confirm(`Do you want to delete blog "${blog.title}"?`)){
            dispatch(deleteBlog(blog.id))
        }
    }

    return(
        <div className='blog' style={blogStyle}>
            <div>
                <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
                <button id='view' onClick={toggleViewDetails}>view</button>
            </div>
            <div style={{ display: viewDetails }} className='viewDetails'>
                {blog.url}<br/>
                likes {blog.likes}
                <button id='like' onClick={() => handleLikeBlog(blog)}>like</button><br/>
                {blog.user.name}<br/>
                <button id='remove' style={{ display: showRemoveButton }} onClick={() => handleDeleteBlog(blog)}>remove</button>
            </div>
        </div>
    )}


export default Blog