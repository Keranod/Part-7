import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Togglable from './Togglable'
import BlogForm from './BlogForm'

import { initializeBlogs } from '../reducers/blogsReducer'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useNavigate,
    useMatch
} from 'react-router-dom'

const BlogList = ({ user }) => {
    const blogs = useSelector(state => state.blogs)
    const [sortedBlogs, setSortedBlogs] = useState([])
    const blogFormRef = useRef()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [])

    useEffect(() => {
        const blogsSortedByLikes = blogs.slice().sort((a, b) => b.likes - a.likes)
        setSortedBlogs(blogsSortedByLikes)
    }, [blogs])

    const handleCreateBlog = () => {
        blogFormRef.current.toggleVisibility()
    }

    const blogForm = () => (
        <Togglable buttonId='newBlog' buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm toggleVisibility={handleCreateBlog} />
        </Togglable>
    )

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div>
            <div>
                {blogForm()}
            </div>
            <div>
                {sortedBlogs.map(blog =>
                    <div key={blog.id} className='blog' style={blogStyle}>
                        <Link  to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BlogList