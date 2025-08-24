const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Message = require('../models/message')
const api = supertest(app)

describe('two messages in database', () => {
    const initialMessages = [
        {
            'timestamp': '24.4.2025 klo 10.29.41',
            'name': 'Marjatta',
            'phoneNumber': '040112314',
            'email': 'example@email.com',
            'content': 'This is a test message',
            'id': '6809e865105a13104131ccf6'
        },

        {
            'timestamp': '24.4.2025 klo 10.32.41',
            'name': 'Matti',
            'phoneNumber': '050112314',
            'email': 'example2@email.com',
            'content': 'This is another test message',
            'id': '6809e865105a13104131aaf6'
        }
    ]

    beforeEach(async () => {
        await Message.deleteMany({})
        let messageObject = new Message(initialMessages[0])
        await messageObject.save()
        messageObject = new Message(initialMessages[1])
        await messageObject.save()
    })

    test('messages are returned as json', async () => {
        await api
            .get('/api/messages')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all messages are returned', async () => {
        const response = await api.get('/api/messages')
        assert.strictEqual(response.body.lenght, initialMessages.lenght)
    })

    test('content field matches', async () => {
        const response = await api.get('/api/messages')
        assert.strictEqual(response.body[0].content, initialMessages[0].content)
    })

    test('message can be deleted', async () => {
        const response1 = await api.get('/api/messages')
        const id = response1.body[0].id
        await api.delete(`/api/messages/${id}`)
        const response2 = await api.get('/api/messages')
        assert.strictEqual(response2.body.length, initialMessages.length - 1)
    })
})

describe('sending new message', () => {
    const messageToBeSent =
        {
            'name': 'Marjatta',
            'phoneNumber': '040112314',
            'email': 'example@email.com',
            'content': 'This is a test message'
        }


    beforeEach(async () => {
        await Message.deleteMany({})
    })

    test('sent message is in database', async () => {
        await api.post('/api/messages').send(messageToBeSent)
        const response = await api.get('/api/messages')
        console.log(response.body)
        assert.strictEqual(response.body.length, 1)

    })
})




after(async () => {
    mongoose.connection.close()
})