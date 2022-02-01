const BlogModel = require('../models/blogs')

const initialBlogs = [
    {
        author: "asd",
        title: "asd",
        url: "asd.com",
        upvotes: 54
    },
    {
        author: "kjh",
        title: "kjh",
        url: "kjh.com",
        upvotes: 23
    }
]

const blogsInDB = async () => {
    const blogs = await BlogModel.find({})
    return(blogs.map(blog => blog.toJSON()))
}

module.exports = {
    initialBlogs,
    blogsInDB
}