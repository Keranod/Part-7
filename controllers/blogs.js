const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

function generateRandomNumberId(length = 8) {
    const min = Math.pow(10, length - 1)
    const max = Math.pow(10, length) - 1
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })

    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const user = request.user

    if (!body.title) {
        return response.status(400).end()
    }

    if (!body.url) {
        return response.status(400).end()
    }

    if (!body.likes) {
        body.likes = 0
    }

    if (!body.comments) {
        body.comments = []
    }

    if (!request.token) {
        return response.status(401).send({ error: 'Unauthorized' })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id,
        comments: body.comments
    })

    const savedBlog = await blog.save()
    await savedBlog.populate('user', { username: 1, name: 1 })
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const user = request.user
    const userId = user.id
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() !== userId.toString()) {
        return response.status(401).json({ error: 'invalid user' })
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.put('/:id', async (request, response) => {
    if (!request.token) {
        return response.status(401).send({ error: 'Unauthorized' })
    }

    const body = request.body

    if (!body.title) {
        return response.status(400).end().json({ error: 'Missing title property' })
    }

    const title = body.title

    let likes = 0

    if (body.likes) {
        likes = body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,
        { title, likes },
        { new: true, runValidators: true, context: 'query' }
    ).populate('user', { username: 1, name: 1 })

    response.status(200).json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
    if (!request.token) {
        return response.status(401).send({ error: 'Unauthorized' })
    }

    const body = request.body

    if (!body.comment) {
        return response.status(400).end().json({ error: 'Missing comment property' })
    }

    const commentObject = {
        id: generateRandomNumberId(),
        comment: body.comment
    }

    console.log(commentObject)

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            request.params.id,
            {
                $push: { comments: commentObject }
            },
            { new: true }
        )

        console.log(updatedBlog)

        if (!updatedBlog) {
            return response.status(404).json({ error: 'Blog not found' })
        }

        await updatedBlog.populate('user', { username: 1, name: 1 }).execPopulate()

        response.status(201).json(updatedBlog)
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' })
    }
})

module.exports = blogsRouter
