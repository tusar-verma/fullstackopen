const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: String,
    url: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        default: 0
    }
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
  