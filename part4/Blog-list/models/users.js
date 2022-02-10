const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userScheme = new mongoose.Schema({
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    passwordHash: {
        type: String,    
        required: true,
        minlength: 3
    },
    name: String
})
userScheme.set('toJSON', {
    transform: (oldDoc, newDoc) => {
        newDoc.id = oldDoc._id.toString()
        delete newDoc._id
        delete newDoc.__v
        delete newDoc.passwordHash
    }
})
mongoose.plugin(uniqueValidator)

module.exports = mongoose.model('User', userScheme)