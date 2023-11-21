const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Test title blog 1',
        author: 'Me starring myself',
        url: 'some-random-url.pl',
        likes: 231
    },
    {
        title: 'Test title blog 2',
        author: 'You being youself',
        url: 'some-random-url.com',
        likes: 231123
    },
    {
        title: 'Test title blog 3',
        author: 'He being himself',
        url: 'some-random-url.org',
        likes: 231123123
    },
    {
        title: 'Test title blog 4',
        author: 'She being herself',
        url: 'some-random-url.io',
        likes: 3464574
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb
}
