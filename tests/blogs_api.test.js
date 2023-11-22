const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const usersHelper = require('./users_test_helper.js')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

// token will give me username and _id object
// to add new blog i need token
// token is acquired after succesful login +
// sucessful login is after sending correct username and password +
// adding

const initialBlogs = helper.initialBlogs

let token = null

beforeAll(async () => {
    const request = await api
        .post('/api/login')
        .send(usersHelper.initialUsers[0])
        .expect(200)

    token = request.body.token
})

beforeEach(async () => {
    await Blog.deleteMany({})

    // const blogObjects = initialBlogs
    //     .map(blog => new Blog(blog))
    // const promiseArray = blogObjects.map(blog => blog.save())
    // await Promise.all(promiseArray)

    await Promise.all(
        helper.initialBlogs.map(async (blog) => {
            await api
                .post('/api/blogs')
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(blog)
                // cannot check expects, if expect(201) gets 500 if I check for 500 i get 201. Does not make sense
                // but it works in test, only not here
        })
    )
})

describe('api calls', () => {
    test('blogs lenght is correct and returned format is json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(initialBlogs.length)
    })

    test('property named "id" exists', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })

    test('HTTP POST request to blogs', async () => {
        const newBlog = {
            title: 'HTTP POST worked',
            author: 'my by my',
            url: 'hmmmmm.oo',
            likes: 90253
        }

        await api
            .post('/api/blogs')
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(initialBlogs.length + 1)
        expect(response.body.at(-1).title).toEqual(newBlog.title)
    })

    test('likes property is missing from HTTP POST', async () => {
        const newBlog = {
            title: 'HTTP POST likes missing',
            author: 'my by my',
            url: 'hmmmmm.oo'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        expect(response.body.find((blog) => blog.title === 'HTTP POST likes missing').likes).toEqual(0)
    })

    test('title is missing from POST', async () => {
        const newBlog = {
            author: 'Title is missing',
            url: 'hmmmmm.oo'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('url is missing from POST', async () => {
        const newBlog = {
            title: 'HTTP POST likes missing',
            author: 'Url is missing'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('deletion of blog with specific id', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            initialBlogs.length - 1
        )

        expect(blogsAtEnd).not.toContain(blogToDelete.content)
    })

    test('update blog likes', async () => {
        const blogs = await helper.blogsInDb()
        const blogToUpdate = blogs[0]

        const newBlogData = {
            title: blogToUpdate.title,
            likes: -150
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(newBlogData)
            .expect(200)

        const updatedBlog = await api
            .get(`/api/blogs/${blogToUpdate.id}`)

        // console.log(updatedBlog.body)
        expect(updatedBlog.body.likes).toEqual(newBlogData.likes)
    })

    test('fail adding blog without a token', async () => {
        const newBlog = {
            title: 'HTTP POST worked',
            author: 'my by my',
            url: 'hmmmmm.oo',
            likes: 90253
        }

        await api
            .post('/api/blogs')
            .set('content-type', 'application/json')
            .send(newBlog)
            .expect(401)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
