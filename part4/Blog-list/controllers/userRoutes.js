const userRouter = require('express').Router()
const userModel = require('../models/users')
const bcrypt = require('bcrypt')

userRouter.get('/', async (req, res) => {
    const users = await userModel.find({}).populate('blogs')

    res.json(users)

})

userRouter.post('/', async (req, res) => {
    const body = req.body

    if (body.password.length < 3 || body.username.length < 3) {
        res.status(400).json({error: "invalid data."})
    }

    const passHash = await bcrypt.hash(body.password, 10) 

    const user = new userModel({
        blogs: [],
        username: body.username,
        passwordHash: passHash,
        name: body.name
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
    
})

module.exports = userRouter