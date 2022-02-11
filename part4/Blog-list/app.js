const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogRoutes')
const userRouter = require('./controllers/userRoutes')
const loginRouter = require('./controllers/loginRoutes')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI)
console.log('Connected to mongodb')

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login',loginRouter)
app.use(middleware.errorHandler)

module.exports = app