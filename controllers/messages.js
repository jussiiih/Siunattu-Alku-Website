const messagesRouter = require('express').Router()
const Message = require('../models/message')

messagesRouter.get('/', (request, response) => {
    Message.find({})
      .then(messages => {
        response.json(messages)
      })
  })
  
messagesRouter.post('/', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({
        error: 'content missing'
      })
    }
  
    if (!body.phonenumber && !body.email) {
      return response.status(400).json({
        error: 'phonenumber or email needed'
      })
    }
    const message = new Message({
      name: body.name,
      phoneNumber: body.name,
      email: body.email,
      content: body.content,
      timestamp: new Date().toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' })
    })
  
    message.save()
      .then(savedMessage => {
        response.json(savedMessage)
      })
  })
  
messagesRouter.delete('/:id', (request, response) => {
    Message.findByIdAndDelete(request.params.id)
      .then(result => {
        if (result) {
          response.status(204).end()
        } else {
          response.status(404).json({ error: 'message not found' })
        }
      })
      .catch(error => {
        console.error(error)
        response.status(500).json({ error: 'something went wrong while deleting' })
      })
  })

module.exports = messagesRouter