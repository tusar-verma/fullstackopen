const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Missing arguments. Should be "node mongo.js <password> [name] [number]"')
}
const password = process.argv[2]
const nameArg = process.argv[3]
const numberArg = process.argv[4]

const mongo_URI = `mongodb+srv://tusar:${password}@phonebookcluster.zzyzx.mongodb.net/PhonebookDB?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String,
    number: Number
})
personSchema.set('toJSON', {
    transform: (oldDocument, newDocument)=>{
        newDocument.id = newDocument._id
        delete newDocument._id
        delete newDocument.__v
    }
})

const Person = mongoose.model('Person',personSchema)

if (!nameArg && !numberArg){
    console.log('List contacts')    
    mongoose.connect(mongo_URI)
    Person
        .find({})
        .then(persons =>{
            console.log(persons)
            mongoose.connection.close()
        })

}else if (nameArg && numberArg){    
    console.log('Add contact')
    mongoose.connect(mongo_URI)
    const person = new Person({
        name: nameArg,
        number: numberArg
    })
    person
        .save()
        .then(result => {
            console.log(result)
            mongoose.connection.close()
        })
}else{
    console.log('Incorrect arguments')
}



