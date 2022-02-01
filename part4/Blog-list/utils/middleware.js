
const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError'){
        response.status(400)
        return response.send({error: 'missing data'})
    }
    next(error)
}
module.exports = {
    errorHandler
}