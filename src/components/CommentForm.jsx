import { useState } from 'react'
import { useDispatch } from 'react-redux'

const CommentForm = ({ comments }) => {
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const handleAddComment = async (event) => {
        event.preventDefault()
        try {
            // need to create axios request to add comment and then usng response data concat to comments
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

                <button id='add' type='submit'>add comment</button>

            </form>
        </div>
    )
}

export default CommentForm