const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const messagesRouter = require('./controllers/messages')
const loginRouter = require('./controllers/login')
const prayersRouter = require('./controllers/prayers')
const middleware = require('./utils/middleware')
const path = require('path')
const helmet = require('helmet')


const app = express()

logger.info('connecting to MongoDB')

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB: ', error.message)
    })

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use(helmet())
app.disable('x-powered-by')

app.use('/api/messages', messagesRouter)
app.use('/api/login', loginRouter)
app.use('/api/prayers', prayersRouter)

app.get('*', (req, res) => {
    console.log('Fallback route hit:', req.path)
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app