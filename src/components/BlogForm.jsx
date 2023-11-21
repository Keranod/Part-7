import { useState } from 'react'
import { createBlog } from '../reducers/blogsReducer'
import { useDispatch } from 'react-redux'
import { notificationReducer } from '../reducers/notificationReducer'

const BlogForm = ({ toggleVisibility }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const dispatch = useDispatch()

    const handleCreateBlog = async (event) => {
        event.preventDefault()
        try {
            dispatch(createBlog({
                title: title,
                author: author,
                url: url
            }))
            dispatch(notificationReducer({
                message: `a new blog ${title} by ${author} added`,
                type: 'success'
            }))

            setTitle('')
            setAuthor('')
            setUrl('')
            toggleVisibility()
        } catch (exception) {
            console.log(exception)
        }
    }

    return (
        <div>
            <h2>create new</h2>

            <form onSubmit={handleCreateBlog}>

                <div>
          title:
                    <input
                        id='title'
                        type='text'
                        value={title}
                        name='Title'
                        onChange={({ target }) => setTitle(target.value)}
                        placeholder='write title here'
                    />
                </div>

                <div>
          author:
                    <input
                        id='author'
                        type='text'
                        value={author}
                        name='Author'
                        onChange={({ target }) => setAuthor(target.value)}
                        placeholder='write author here'
                    />
                </div>

                <div>
          url:
                    <input
                        id='url'
                        type='text'
                        value={url}
                        name='Url'
                        onChange={({ target }) => setUrl(target.value)}
                        placeholder='write url here'
                    />
                </div>

                <button id='create' type='submit'>create</button>

            </form>
        </div>
    )
}

export default BlogForm