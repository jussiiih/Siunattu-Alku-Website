const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const config = require('../utils/config')
const logger = require('../utils/logger')
const axios = require('axios')
const LoginRecord = require('../models/loginRecord')

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

    const ip =
        request.headers['x-forwarded-for']?.split(',')[0] ||
        request.connection.remoteAddress

    let location = 'Unknown location'

    try {
        const geoRes = await axios.get(`http://ip-api.com/json/${ip}?fields=country,regionName,city,status,message`)
        const data = geoRes.data

        if (data.status === 'success') {
            location = `${data.city}, ${data.regionName}, ${data.country}`
        } else {
            console.warn('GeoIP lookup failed:', data.message)
        }
    } catch (err) {
        console.error('GeoIP error:', err.message)
    }

    const loginRecord = new LoginRecord({
        username,
        timestamp: new Date(),
        ip,
        userAgent: request.headers['user-agent'],
        location
    })

    try {
        await loginRecord.save()
        console.log('Login attempt saved to DB')
    } catch (err) {
        console.error('Failed to save login attempt:', err.message)
    }
})

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

loginRouter.get('/', async (request, response) => {
    const token = getTokenFrom(request)

    if (!token) {
        return response.status(401).json({ error: 'token missing' })
    }

    const decodedToken = jwt.verify(getTokenFrom(request), config.SECRET)
    if (!decodedToken.username) {
        return response.status(401).json({ error: 'token invalid' })
    }
    try {
        const loginRecords = await LoginRecord.find({})
        response.json(loginRecords)
    }
    catch (error) {
        logger.error('Error fetching login records:', error)
        response.status(500).json({ error: 'failed to fetch login records' })
    }
})

module.exports = loginRouter
