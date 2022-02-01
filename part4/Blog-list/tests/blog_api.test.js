const supertest = require('supertest')
const moongose = require('mongoose')
const blogHelper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const BlogModel = require('../models/blogs')



beforeEach(async () => {
    await BlogModel.deleteMany({})

    const blogObjs = blogHelper.initialBlogs.map(blog => new BlogModel(blog))
    const promises = blogObjs.map(blogObj => blogObj.save())

    await Promise.all(promises)
})

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
        author: "uio",
        title: "uio",
        url: "uio.com",
        upvotes: 2
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-type', /application\/json/)

    const blogsInDB = await blogHelper.blogsInDB()
    expect(blogsInDB.length).toBe(blogHelper.initialBlogs.length +1)
    const blogsWithoutID = blogsInDB.map(({id, ...rest}) => rest)
    expect(blogsWithoutID).toContainEqual(newBlog)
})

test("if upvotes property is missing it will default to 0", async () => {
    const newBlog = {
        author: "jkl",
        title: "jkl",
        url: "jkl.com",
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-type', /application\/json/)

    const blogsInDB = await blogHelper.blogsInDB()
    const blogsWithoutID = blogsInDB.map(({id, ...rest}) => rest)
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
        .send(newBlog)
        .expect(400)
        .expect('Content-type', /application\/json/)
})

afterAll(() => {
    moongose.connection.close()
})