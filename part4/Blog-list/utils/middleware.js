
const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError'){
        response.status(400)
        return response.send({error: 'missing data'})
    } else if (error.name === 'JsonWebTokenError'){
        return response.status(401).json({
            error: 'invalid token'
        })
    }
    next(error)
}
module.exports = {
    errorHandler
}