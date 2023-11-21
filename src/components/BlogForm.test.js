import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> event handler is called with right details when new blog is created', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const inputTitle = screen.getByPlaceholderText('write title here')
    const inputAuthor = screen.getByPlaceholderText('write author here')
    const inputUrl = screen.getByPlaceholderText('write url here')
    const submitButton = screen.getByText('create')

    await user.type(inputTitle, 'Zielone Korale')
    await user.type(inputAuthor, 'Jan Matejko')
    await user.type(inputUrl, 'totoroto.pl')
    await user.click(submitButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Zielone Korale')
    expect(createBlog.mock.calls[0][0].author).toBe('Jan Matejko')
    expect(createBlog.mock.calls[0][0].url).toBe('totoroto.pl')
})