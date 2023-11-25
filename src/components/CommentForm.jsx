import { useState } from 'react'
import { useDispatch } from 'react-redux'
import blogsService from '../services/blogs'
import { updateBlogs } from '../reducers/blogsReducer'

import {
    StyledButton
} from '../styles/BlogListStyles'

const CommentForm = ({ blog }) => {
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const handleAddComment = async (event) => {
        event.preventDefault()
        try {
            const updatedBlog = await blogsService.addComment(blog.id, comment)
            // console.log(updatedBlog)
            dispatch(updateBlogs(updatedBlog))
            setComment('')
        } catch (exception) {
            console.log(exception)
        }
    }

    return (
        <div>
              <form onSubmit={handleAddComment}>
                <div>
                    <input
                        id='comment'
                        type='text'
                        value={comment}
                        name='Comment'
                        onChange={({ target }) => setComment(target.value)}
                        placeholder='write comment here'
                    />
                </div>

                <StyledButton id='add' type='submit'>add comment</StyledButton>

            </form>
        </div>
    )
}

export default CommentForm