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

test('deleting an existing blog works correctly', async () => {
    const befDel_blogsInDB = await blogHelper.blogsInDB()
    const blogToBeRemoved = befDel_blogsInDB[0]

    await api
        .delete(`/api/blogs/${blogToBeRemoved.id}`)
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