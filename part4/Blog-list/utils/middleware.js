const jwt = require('jsonwebtoken')

const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError'){
        return response.status(400).json({error: 'missing data'})
    } else if (error.name === 'JsonWebTokenError'){
        return response.status(401).json({error: 'invalid token'})
    } else if (error.name === 'CastError') {
        return response.status(400).json({error: 'invalid data'})
    }
    next(error)
}

const tokenExtractor  = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      request.token = authorization.substring(7)
    }
    next()
}

const userExtractor = (request, response, next) => {
    request.user = jwt.verify(request.token, process.env.SECRET) 
    next()
}

module.exports = {
    errorHandler,
    tokenExtractor,
    userExtractor
}