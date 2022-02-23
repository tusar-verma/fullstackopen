const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const userModel = require('../models/users')

loginRouter.post('/', async (req, res) => {
    const body = req.body
    const userDb = await userModel.findOne({username: body.username})
    const passCorrect = userDb === null 
        ? false 
        : await bcrypt.compare(body.password, userDb.passwordHash) 
    if (!(userDb && passCorrect)){
        return res.status(400).json({error: 'Invalid username or password'})
    }
    const userForToken = {
        username: userDb.username,
        id: userDb._id
    }
    const token = jwt.sign(userForToken, process.env.SECRET)
    res
        .status(200)
        .json({token, username: userDb.username, name: userDb.name})
                            
})

module.exports = loginRouter