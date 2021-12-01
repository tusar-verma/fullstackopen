const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
// eslint-disable-next-line no-undef
const PORT = process.env.PORT
const app = express()
const Person = require('./models/person.js')

const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  if (error.name === 'CastError'){
    return response.status(400).json({ error: 'malformed id' })
  }else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}


app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postLog'))
app.use(express.static('build'))

morgan.token('postLog', (req, res) => {
  return JSON.stringify(req.body)
})

app.get('/', (request, response) => {
  response.send('<h1>Phonebook</h1>')
})

app.get('/info', (request, response, next) => {
  Person.find({})
    .then(people => {
      response.send(`<p>Phonebook has info for ${people.length} people</p>
            ${new Date()}`)
    })
    .catch(error => next(error))

})

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(people => {
      response.json(people)
    })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const newPerson = new Person({
    name: body.name,
    number: body.number
  })
  newPerson.save()
    .then(result => {
      response.json(result)
    })
    .catch(error => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number
  }
  Person
    .findByIdAndUpdate(request.params.id,person,{ new:true })
    .then(result => {
      response.json(result)
    })
    .catch(error => next(error))

})

app.get('/api/persons/:id', (request, response, next) => {
  Person
    .findById(request.params.id)
    .then(person => {
      response.json(person)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person
    .findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log('server running at port ', PORT)
})


