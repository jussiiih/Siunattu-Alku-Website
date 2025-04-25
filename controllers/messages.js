const messagesRouter = require('express').Router()
const Message = require('../models/message')
const logger = require('../utils/logger')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

messagesRouter.get('/', async (request, response) => {
  if (!token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const decodedToken = jwt.verify(getTokenFrom(request), config.SECRET)
  if (!decodedToken.username) {
    return response.status(401).json({ error: 'token invalid' })
  }
  try {
      const messages = await Message.find({})
      response.json(messages)
    }
    catch (error) {
      logger.error('Error fetching messages:', error)
      response.status(500).json({ error: 'failed to fetch messages' })
    }
  })
  
messagesRouter.post('/', async (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ error: 'content missing' })
    }
  
    if (!body.phoneNumber && !body.email) {
      return response.status(400).json({ error: 'phonenumber or email needed' })
    }
  
    const message = new Message({
      name: body.name,
      phoneNumber: body.phoneNumber,
      email: body.email,
      content: body.content,
      timestamp: new Date().toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' })
    })
  
    try {
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

module.exports = messagesRouter