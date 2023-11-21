import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
    let container

    const blog = {
        title: 'Test blog',
        author: 'Konrad being me',
        url: 'jungle.monkeys',
        likes: '1234',
        user: {
            name: 'Hades'
        }
    }

    const loggedUser = {
        username: 'Hades'
    }

    const likeBlog = jest.fn()

    beforeEach(() => {
        container = render(
            <Blog blog={blog} loggedUser={loggedUser} likeBlog={likeBlog} />
        ).container
    })

    test('blog default render', () => {

        const titleAuthor = screen.getByText(`${blog.title} ${blog.author}`)

        expect(titleAuthor).toBeDefined()

        const div = container.querySelector('.viewDetails')

        expect(div).toHaveStyle('display: none')
    })

    test('URL and likes are shown after "view" pressed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        const div = container.querySelector('.viewDetails')
        expect(div).not.toHaveStyle('display: none')
    })

    test('like button pressed twice', async () => {
        const user = userEvent.setup()

        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(likeBlog.mock.calls).toHaveLength(2)
    })
})