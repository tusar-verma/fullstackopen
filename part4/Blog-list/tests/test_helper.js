const BlogModel = require('../models/blogs')
const UserModel = require('../models/users')
const bcrypt = require('bcrypt')

const initialBlogs = [
    {
        author: "asd",
        title: "asd",
        url: "asd.com"
    },
    {
        author: "kjh",
        title: "kjh",
        url: "kjh.com"
    }
]

const initialUsers = [
    {
        username: 'tusar',
        name: 'tusar',
        passwordHash: 'tusar200'
    },
    {
        username: 'camilo',
        name: 'camilo',
        passwordHash: 'camilo200'
    }

]

const encryptPassUser = async () => {
    for (let user of initialUsers) {
        user.passwordHash = await bcrypt.hash(user.passwordHash,10)
    }
}
encryptPassUser()

const blogsInDB = async () => {
    const blogs = await BlogModel.find({})
    return(blogs.map(blog => blog.toJSON()))
}

const usersInDb = async () => {
    const users = await UserModel.find({})
    return(users.map(u => u.toJSON()))
}

module.exports = {
    initialBlogs,
    initialUsers,
    blogsInDB,
    usersInDb
}