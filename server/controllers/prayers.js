const prayersRouter = require('express').Router()
const Prayer = require('../models/prayer')
const logger = require('../utils/logger')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const algorithm = config.CRYPT_ALGORITH
const cryptKey = config.CRYPT_KEY

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

prayersRouter.get('/', async (request, response) => {
    const token = getTokenFrom(request)

    if (!token) {
        return response.status(401).json({ error: 'token missing' })
    }

    const decodedToken = jwt.verify(getTokenFrom(request), config.SECRET)
    if (!decodedToken.username) {
        return response.status(401).json({ error: 'token invalid' })
    }
    try {
        const prayes = await Prayer.find({})

        prayes.forEach(prayer => {
            if (prayer.content) {
                const encryptedContent = JSON.parse(prayer.content)
                const decipher = crypto.createDecipheriv(algorithm, cryptKey, Buffer.from(encryptedContent.iv, 'hex'))
                const decryptedContent = Buffer.concat([decipher.update(Buffer.from(encryptedContent.content, 'hex')), decipher.final()])
                prayer.content = decryptedContent.toString('utf8')
            }
        })

        response.json(prayes)
    }
    catch (error) {
        logger.error('Error fetching prayes:', error)
        response.status(500).json({ error: 'failed to fetch prayes' })
    }
})

prayersRouter.post('/', async (request, response) => {
    const body = request.body

    const prayer = new Prayer({
        content: body.content,
        timestamp: new Date().toISOString(),
        seen: false
    })



    function encrypt(text) {
        const iv = crypto.randomBytes(16)
        const cipher = crypto.createCipheriv(algorithm, cryptKey, iv)
        const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()])
        const encryptedData = {
            iv: iv.toString('hex'),
            content: encrypted.toString('hex')
        }
        return JSON.stringify(encryptedData)
    }


    try {
        if (prayer.content) {
            prayer.content =  encrypt(prayer.content)
        }

        const savedprayer = await prayer.save()
        logger.info('prayer saved:', savedprayer)
        response.status(201).json(savedprayer)
    }
    catch (error) {
        logger.error('Error saving prayer:', error)
        response.status(500).json({ error: 'failed to save prayer' })
    }
})

prayersRouter.delete('/:id', async (request, response) => {
    const id = request.params.id

    try {
        const result = await Prayer.findByIdAndDelete(id)

        if (result) {
            response.status(204).end()
        } else {
            response.status(404).json({ error: 'prayer not found' })
        }
    }
    catch (error) {
        logger.error('Error deleting prayer:', error)
        response.status(500).json({ error: 'something went wrong while deleting' })
    }
})

prayersRouter.put('/:id', async (request, response) => {

    const token = getTokenFrom(request)

    if (!token) {
        return response.status(401).json({ error: 'token missing' })
    }

    const decodedToken = jwt.verify(token, config.SECRET)
    if (!decodedToken.username) {
        return response.status(401).json({ error: 'token invalid' })}

    try {
        const updatedPrayer = await Prayer.findById(request.params.id)
        if (!updatedPrayer) {
            return response.status(404).json({ error: 'message not found' })
        }

        updatedPrayer.seen = !updatedPrayer.seen
        const savedPrayer = await updatedPrayer.save()
        response.json(savedPrayer)
    } catch (error) {
        logger.error('Error updating message:', error)
        response.status(500).json({ error: 'something went wrong while updating' })
    }
})

module.exports = prayersRouter