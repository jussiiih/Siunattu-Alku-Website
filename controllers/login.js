const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const config = require('../utils/config')

const adminUsername = config.ADMIN_USERNAME
const adminPassword = config.ADMIN_PASSWORD

let loginAttempts = {}

const MAX_TIMER = 1000*60*10

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    if (!loginAttempts[username]) {
        loginAttempts[username] = {
            timer: 0,
            lastAttempt: new Date().getTime(),
        }
    }

    const currentTime = new Date().getTime()
    const { timer, lastAttempt } = loginAttempts[username]

    if (currentTime - lastAttempt < timer) {
        const remainingTime = timer - (currentTime - lastAttempt)
        return response.status(429).json({
            error: `Too many attempts. Please wait ${Math.ceil(remainingTime / 1000)} seconds.`
        })
    }

    if (!(username === adminUsername && password === adminPassword)) {
        loginAttempts[username].timer = Math.min(timer * 2 || 1000, MAX_TIMER)
        loginAttempts[username].lastAttempt = currentTime

        return response.status(401).json({
            error: 'Invalid username or password'
        })
    }

    const token = jwt.sign({ username }, config.SECRET, { expiresIn: 5 * 60 })
    response.status(200).send({ token, username: adminUsername })

    loginAttempts[username] = {
        timer: 0,
        lastAttempt: currentTime,
    }
})

module.exports = loginRouter
