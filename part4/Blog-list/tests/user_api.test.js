const supertest = require('supertest')
const bcrypt = require('bcrypt')
const userHelper = require('./test_helper')
const mongoose = require('mongoose')
const UserModel = require('../models/users')
const app = require('../app')
const api = supertest(app)


beforeEach(async () => {
    await UserModel.deleteMany({})
    
    const userObjs = userHelper.initialUsers.map(u => new UserModel(u))
    const userPromises = userObjs.map(uObj => uObj.save())

    await Promise.all(userPromises)
}, 10000)

describe('Creating user', () => {

    test('With valid data creates a user succesfully', async () => {
        const dbBeforePost = await UserModel.find({})

        const newUser = {
            username: 'lauti',
            name: 'lauti',
            password: 'lauti200'
        }
        await api
                .post('/api/users')
                .send(newUser)
                .expect(201)

        const dbAfterPost = await UserModel.find({})
        expect(dbAfterPost.length).toBeGreaterThan(dbBeforePost.length)
    })

    test('With invalid password does not create it', async () => {        
        const dbBeforePost = await UserModel.find({})

        const newUser = {
            username: 'asd',
            name: 'asd',
            password: 'as'
        }
        await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                
        const dbAfterPost = await UserModel.find({})        
        expect(dbAfterPost.length).toBe(dbBeforePost.length)
    })
    test('With invalid username does not create it', async () => {      
        const dbBeforePost = await UserModel.find({})
        
        const newUser = {
            username: 'ds',
            name: 'dsa',
            password: 'dsa123'
        }
        await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                
        const dbAfterPost = await UserModel.find({})        
        expect(dbAfterPost.length).toBe(dbBeforePost.length)
    })
})

describe('Login', () => {
    test('With valid data', async () => {
        const loginData = {
            username: "camilo",
            password: "camilo200"
        }
        const a = await api
                .post('/api/login')
                .send(loginData)
                .expect(200)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
