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

blogRouter.delete('/:id', async (request, response) => {
  await BlogModel.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const result = await BlogModel.findByIdAndUpdate(request.params.id, request.body, {new: true})
  response.json(result)

})

module.exports = blogRouter