const blogRouter = require('express').Router()
const BlogModel = require('../models/blogs')
const UserModel = require('../models/users')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await BlogModel
                              .find({})
                              .populate('user', {username: 1, id: 1, name: 1})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const tokenDecoded = jwt.verify(body.token, process.env.SECRET)
  const user = await UserModel.findById(tokenDecoded.id)
  if (user === null) response.status(400).json({error: 'Invalid token'})
  
  const newBlog = new BlogModel({
    title: body.title,
    author: body.author,
    upvotes: 0,
    url: body.url,
    user: user._id
  })
  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  
  response.status(201).json(savedBlog)
    
})

blogRouter.delete('/:id', async (request, response) => {
  await BlogModel.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const result = await BlogModel.findByIdAndUpdate(request.params.id, request.body, {new: true})
  response.json(result)

})

module.exports = blogRouter