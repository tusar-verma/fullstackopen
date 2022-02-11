const supertest = require('supertest')
const moongose = require('mongoose')
const blogHelper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const BlogModel = require('../models/blogs')

let credentials = undefined

const login = async () => {
    const testUser = {
        username: "tusar",
        password: "tusar200"
    }

    return await api
                    .post('/api/login')
                    .send(testUser)
}

beforeEach(async () => {
    await BlogModel.deleteMany({})
    
    const result = await login()
    credentials = result.body

    for (const blog of blogHelper.initialBlogs) {
        const result = await api
                                .post('/api/blogs')
                                .set('Authorization', `Bearer ${credentials.token}`)
                                .send(blog)
    }

}, 10000)

test("GET responses with correct json", async () => {
    const blogsInDB = await api.get('/api/blogs')
    expect(blogsInDB.body.length).toBe(blogHelper.initialBlogs.length)
})

test('Unique identifier property of the blog posts is named id', async () => {
    const blogsInDB = await api.get('/api/blogs')
    expect(blogsInDB.body[0].id).toBeDefined() 
})

test('creating a blog', async () => { 
    const newBlog = {
        author: "uioa",
        title: "uiao",
        url: "uio.com"
    }
    const result = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${credentials.token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-type', /application\/json/)


    const blogsInDB = await blogHelper.blogsInDB()
    expect(blogsInDB.length).toBe(blogHelper.initialBlogs.length +1)
    const blogsWithoutExtraData = blogsInDB.map(({id, user, upvotes, ...rest}) => rest)
    expect(blogsWithoutExtraData).toContainEqual(newBlog)
})

test("if upvotes property is missing it will default to 0", async () => {
    const newBlog = {
        author: "jkl",
        title: "jkl",
        url: "jkl.com",
    }
    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${credentials.token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-type', /application\/json/)

    const blogsInDB = await blogHelper.blogsInDB()
    const blogsWithoutID = blogsInDB.map(({id, user, ...rest}) => rest)
    newBlog.upvotes = 0
    expect(blogsWithoutID).toContainEqual(newBlog)

})

test('if title and url are missing then its responded with status code 400', async () => {
    const newBlog = {
        author: 'bnm',
        upvotes: 564
    }
    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${credentials.token}`)
        .send(newBlog)
        .expect(400)
        .expect('Content-type', /application\/json/)
})

test('deleting an existing blog works correctly', async () => {
    const befDel_blogsInDB = await blogHelper.blogsInDB()
    const blogToBeRemoved = befDel_blogsInDB[0]

    await api
        .delete(`/api/blogs/${blogToBeRemoved.id}`)
        .set('Authorization', `Bearer ${credentials.token}`)
        .expect(204)
    
    const aftDel_blogsInDB = await blogHelper.blogsInDB()
    expect(aftDel_blogsInDB.length).toBeLessThan(befDel_blogsInDB.length)

})

test('updating an existing blog by modifing upvotes', async () => {
    const blogsInDB = await blogHelper.blogsInDB()
    const befUpdBlog = blogsInDB[0]

    const blogDataToBeUpd = {
        upvotes: 69,
        title: "agua"
    }

    const blogUpdated = await api
                                .put(`/api/blogs/${befUpdBlog.id}`)
                                .send(blogDataToBeUpd)

    expect(blogUpdated.body.upvotes).toBe(69)
    expect(blogUpdated.body.title).toBe("agua")

})

afterAll(() => {
    moongose.connection.close()
})