import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

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

const BlogView = () => {
    const blogs = useSelector(state => state.blogs)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [])

    const match = useMatch('/blogs/:id')

    const blogId = match.params.id

    const blog = match
        ? blogs.find(blog => blog.id === blogId)
        : null

    if (!blog) {
        return null
    }

    // return (
    //     <div>
    //         {blog.id}
    //         {blog.title}
    //         {blog.author}
    //         {blog.url}
    //         {blog.likes}
    //     </div>
    // )

    return (
        <div>
            <h1>{blog.title} {blog.author}</h1>
            <a href={blog.url}>{blog.url}</a>
            <div>
                {blog.likes} likes
            </div>
            <div>
                added by {blog.user.username}
            </div>
        </div>
    )

}

export default BlogView