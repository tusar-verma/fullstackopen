const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const URI = process.env.MONGODB_URI
mongoose.connect(URI)
    .then(result => {
        console.log('Connected to ', URI)
    })
    .catch(error => {
        console.log('Could not connect to server. ', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlenght: 3,
        unique: true
    },
    number: {
        type: Number,
        required: true,
        minlength: 8,
        unique:true
    },
})
personSchema.set('toJSON', {
    transform: (document, newDocument)=>{
        newDocument.id = document._id
        delete newDocument._id
        delete newDocument.__v
    }
})
personSchema.plugin(uniqueValidator)

module.exports = mongoose.model('person', personSchema)

