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

import {
    StyledBlogDiv
} from '../styles/BlogListStyles'

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

    return (
        <div>
            <div>
                {blogForm()}
            </div>
            <div>
                {sortedBlogs.map(blog =>
                    <StyledBlogDiv key={blog.id} className='blog'>
                        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
                    </StyledBlogDiv>
                )}
            </div>
        </div>
    )
}

export default BlogList