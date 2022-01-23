const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

blogSchema.set('toJSON',{
    transform: (oldObj, newObj) => {
        newObj.id = oldObj._id
        delete newObj._id
        delete newObj.__v
    }
})

const BlogModel = mongoose.model('Blog', blogSchema)

module.exports = BlogModel
  