const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./users_test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    // await User.insertMany(helper.initialUsers)
    await Promise.all(
        helper.initialUsers.map(async (user) => {
            await api
                .post('/api/users')
                .send(user)
                .expect(201)
        })
    )
})

describe('api users bad calls', () => {
    test('missing username property', async () => {
        const newUser = {
            name: 'Missing Username',
            password: 'AAAAAAAAAAAA'
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(response.body.error).toEqual('username property is missing')
    })

    test('missing password property', async () => {
        const newUser = {
            username: 'Him',
            name: 'Missing Username'
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(response.body.error).toEqual('password property is missing')
    })

    test('username shorter than 3 chars', async () => {
        const newUser = {
            username: 'rt',
            name: 'to short',
            password: 'kiloogorkow'
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(response.body.error).toEqual('username must be at least 3 characters long')
    })

    test('password shorter than 3 chars', async () => {
        const newUser = {
            username: 'root',
            name: 'to short',
            password: '12'
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(response.body.error).toEqual('password must be at least 3 characters long')
    })

    test('username is not unique', async () => {
        const newUser = helper.initialUsers[0]

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(response.body.error).toContain('User validation failed: username: Error, expected `username` to be unique.')
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
