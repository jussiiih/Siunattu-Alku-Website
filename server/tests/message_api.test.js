const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Message = require('../models/message')
const { ADMIN_USERNAME, ADMIN_PASSWORD, MONGODB_URI } = require('../utils/config')
const api = supertest(app)



describe('two messages in database', () => {
    let token
    const currentTimestamp = new Date().toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' })

    const initialMessages = [
        {
            'timestamp': currentTimestamp,
            'name': 'Marjatta',
            'phoneNumber': '040112314',
            'email': 'example@email.com',
            'content': 'This is a test message',
            'id': '6809e865105a13104131ccf6'
        },

        {
            'timestamp': currentTimestamp,
            'name': 'Matti',
            'phoneNumber': '050112314',
            'email': 'example2@email.com',
            'content': 'This is another test message',
            'id': '6809e865105a13104131aaf6'
        }
    ]

    beforeEach(async () => {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(MONGODB_URI)
        }
        await Message.deleteMany({})

        const loginResponse = await api
            .post('/api/login')
            .send({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD })
            .expect(200)

        token = loginResponse.body.token

        await api.post('/api/messages').set('Authorization', `Bearer ${token}`).send(initialMessages[0])
        await api.post('/api/messages').set('Authorization', `Bearer ${token}`).send(initialMessages[1])
    })

    test('messages are returned as json', async () => {
        await api
            .get('/api/messages')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all messages are returned', async () => {
        const response = await api.get('/api/messages').set('Authorization', `Bearer ${token}`)
        assert.strictEqual(response.body.length, initialMessages.length)
    })

    test('timestamp field matches', async () => {
        const response = await api.get('/api/messages').set('Authorization', `Bearer ${token}`)
        const bodyTimestamp = response.body[0].timestamp
        const date = new Date(bodyTimestamp)

        const formattedDateString = date.toLocaleString('fi-FI', {
            timeZone: 'Europe/Helsinki',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        })
        assert.strictEqual(formattedDateString.split(' klo ')[0], initialMessages[0].timestamp.split(' klo ')[0])
    })

    test('name field matches', async () => {
        const response = await api.get('/api/messages').set('Authorization', `Bearer ${token}`)
        assert.strictEqual(response.body[0].name, initialMessages[0].name)
    })
    test('phoneNumber field matches', async () => {
        const response = await api.get('/api/messages').set('Authorization', `Bearer ${token}`)
        assert.strictEqual(response.body[0].phoneNumber, initialMessages[0].phoneNumber)
    })

    test('content field matches', async () => {
        const response = await api.get('/api/messages').set('Authorization', `Bearer ${token}`)
        assert.strictEqual(response.body[0].content, initialMessages[0].content)
    })

    test('new message is categorized as unseen', async () => {
        const response = await api.get('/api/messages').set('Authorization', `Bearer ${token}`)
        assert.strictEqual(response.body[0].seen, false)
    })

    test('message can be deleted', async () => {
        const response1 = await api.get('/api/messages').set('Authorization', `Bearer ${token}`)
        const id = response1.body[0].id
        await api.delete(`/api/messages/${id}`)
        const response2 = await api.get('/api/messages').set('Authorization', `Bearer ${token}`)
        assert.strictEqual(response2.body.length, initialMessages.length - 1)
    })

    test('seen attribute can be changed', async () => {
        const responseToGetId = await api.get('/api/messages').set('Authorization', `Bearer ${token}`)
        const id = responseToGetId.body[0].id

        await api.put(`/api/messages/${id}`).set('Authorization', `Bearer ${token}`)
        const responseUnseenToSeen = await api.get('/api/messages').set('Authorization', `Bearer ${token}`)
        assert.strictEqual(responseUnseenToSeen.body[0].seen, true)

        await api.put(`/api/messages/${id}`).set('Authorization', `Bearer ${token}`)
        const responseSeenToUnseen = await api.get('/api/messages').set('Authorization', `Bearer ${token}`)
        assert.strictEqual(responseSeenToUnseen.body[0].seen, false)
    })
})


after(async () => {
    mongoose.connection.close()
})