const blogRouter = require('express').Router()
const BlogModel = require('../models/blogs')

blogRouter.get('/', async (request, response) => {
  const blogs = await BlogModel.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  
  const blog = new BlogModel(request.body)
  const savedNote = await blog.save()
  response.status(201).json(savedNote)
    
})
  
  module.exports = blogRouter