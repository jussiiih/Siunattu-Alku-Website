const jwt =require('jsonwebtoken')
const loginRouter = require('express').Router()
const config = require('../utils/config')

const adminUsername = config.ADMIN_USERNAME
const adminPassword = config.ADMIN_PASSWORD



loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    if (!(username === adminUsername && password === adminPassword)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const token = jwt.sign({ username }, config.SECRET, { expiresIn: 5*60 })

    response.status(200).send({ token, username: adminUsername })

})

module.exports = loginRouter

