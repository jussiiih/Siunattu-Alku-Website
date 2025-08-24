const messagesRouter = require('express').Router()
const Message = require('../models/message')
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

messagesRouter.get('/', async (request, response) => {
    const token = getTokenFrom(request)

    if (!token) {
        return response.status(401).json({ error: 'token missing' })
    }

    const decodedToken = jwt.verify(token, config.SECRET)
    if (!decodedToken.username) {
        return response.status(401).json({ error: 'token invalid' })
    }
    try {
        const messages = await Message.find({})

        messages.forEach(message => {
            if (message.name) {
                const encryptedName = JSON.parse(message.name)
                const decipher = crypto.createDecipheriv(algorithm, cryptKey, Buffer.from(encryptedName.iv, 'hex'))
                const decryptedName = Buffer.concat([decipher.update(Buffer.from(encryptedName.content, 'hex')), decipher.final()])
                message.name = decryptedName.toString('utf8')
            }
            if (message.phoneNumber) {
                const encryptedPhoneNumber = JSON.parse(message.phoneNumber)
                const decipher = crypto.createDecipheriv(algorithm, cryptKey, Buffer.from(encryptedPhoneNumber.iv, 'hex'))
                const decryptedPhoneNumber = Buffer.concat([decipher.update(Buffer.from(encryptedPhoneNumber.content, 'hex')), decipher.final()])
                message.phoneNumber = decryptedPhoneNumber.toString('utf8')
            }
            if (message.email) {
                const encryptedEmail = JSON.parse(message.email)
                const decipher = crypto.createDecipheriv(algorithm, cryptKey, Buffer.from(encryptedEmail.iv, 'hex'))
                const decryptedEmail = Buffer.concat([decipher.update(Buffer.from(encryptedEmail.content, 'hex')), decipher.final()])
                message.email = decryptedEmail.toString('utf8')
            }
            if (message.content) {
                const encryptedContent = JSON.parse(message.content)
                const decipher = crypto.createDecipheriv(algorithm, cryptKey, Buffer.from(encryptedContent.iv, 'hex'))
                const decryptedContent = Buffer.concat([decipher.update(Buffer.from(encryptedContent.content, 'hex')), decipher.final()])
                message.content = decryptedContent.toString('utf8')
            }
        })

        response.json(messages)
    }
    catch (error) {
        logger.error('Error fetching messages:', error)
        response.status(500).json({ error: 'failed to fetch messages' })
    }
})

messagesRouter.post('/', async (request, response) => {
    const body = request.body

    const message = new Message({
        messageType: body.messageType,
        name: body.name,
        phoneNumber: body.phoneNumber,
        email: body.email,
        content: body.content,
        feedbackPublic: body.feedbackPublic,
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
        if (message.name) {
            message.name = encrypt(message.name)
        }
        if (message.phoneNumber) {
            message.phoneNumber = encrypt(message.phoneNumber)
        }
        if (message.email) {
            message.email = encrypt(message.email)
        }
        if (message.content) {
            message.content =  encrypt(message.content)
        }

        const savedMessage = await message.save()
        logger.info('Message saved:', savedMessage)
        response.status(201).json(savedMessage)
    }
    catch (error) {
        logger.error('Error saving message:', error)
        response.status(500).json({ error: 'failed to save message' })
    }
})

messagesRouter.delete('/:id', async (request, response) => {
    const id = request.params.id

    try {
        const result = await Message.findByIdAndDelete(id)

        if (result) {
            response.status(204).end()
        } else {
            response.status(404).json({ error: 'message not found' })
        }
    }
    catch (error) {
        logger.error('Error deleting message:', error)
        response.status(500).json({ error: 'something went wrong while deleting' })
    }
})

messagesRouter.put('/:id', async (request, response) => {

    const token = getTokenFrom(request)

    if (!token) {
        return response.status(401).json({ error: 'token missing' })
    }

    const decodedToken = jwt.verify(token, config.SECRET)
    if (!decodedToken.username) {
        return response.status(401).json({ error: 'token invalid' })}

    try {
        const updatedMessage = await Message.findById(request.params.id)
        if (!updatedMessage) {
            return response.status(404).json({ error: 'message not found' })
        }

        updatedMessage.seen = !updatedMessage.seen
        const savedMessage = await updatedMessage.save()
        response.json(savedMessage)
    } catch (error) {
        logger.error('Error updating message:', error)
        response.status(500).json({ error: 'something went wrong while updating' })
    }
})

module.exports = messagesRouter