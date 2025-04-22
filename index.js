const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())


let messages = [
  {
    id: "1",
    timestamp: "2025-04-22T15:06:19.085Z",
    name: "Matti",
    phonenumber: "045123456",
    email: "example@email.com",
    content: "This is a test message"
  },
  {
    id: "2",
    timestamp: "2025-04-22T15:06:19.085Z",
    name: "Pekka",
    phonenumber: "045123456",
    email: "example@email.com",
    content: "This is a test message"
  },
  {
    id: "3",
    timestamp: "2025-04-22T15:06:19.085Z",
    name: "Anna",
    phonenumber: "045123456",
    email: "example@email.com",
    content: "This is a test message"
  }
]

app.get('/api/messages', (request, response) => {
  response.json(messages)
})

app.post('/api/messages', (request, response) => {
  const maxId = messages.length > 0
  ? Math.max(...messages.map(n => Number(n.id))) 
  : 0

  const message = request.body

  if (!message.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  if (!message.phonenumber && !message.email) {
    return response.status(400).json({
      error: 'phonenumber or email needed'
    })
  }

  message.id = String(maxId + 1)

  message.timestamp = message.timestamp = new Date().toISOString()

  messages = messages.concat(message)
  response.json(message)
})

app.delete('/api/messages/:id', (request, response) => {
  messages = messages.filter(message => message.id !== request.params.id)
  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})