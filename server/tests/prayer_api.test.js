const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Prayer = require('../models/prayer')
const { ADMIN_USERNAME, ADMIN_PASSWORD, MONGODB_URI } = require('../utils/config')
const api = supertest(app)



describe('two prayers in database', () => {
    let token
    const currentTimestamp = new Date().toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' })

    const initialPrayers = [
        {
            'timestamp': currentTimestamp,
            'content': 'This is a test prayer',
            'id': '6809e865105a13104131ccf6'
        },

        {
            'timestamp': currentTimestamp,
            'content': 'This is another test prayere',
            'id': '6809e865105a13104131aaf6'
        }
    ]

    beforeEach(async () => {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(MONGODB_URI)
        }
        await Prayer.deleteMany({})

        const loginResponse = await api
            .post('/api/login')
            .send({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD })
            .expect(200)

        token = loginResponse.body.token

        await api.post('/api/prayers').set('Authorization', `Bearer ${token}`).send(initialPrayers[0])
        await api.post('/api/prayers').set('Authorization', `Bearer ${token}`).send(initialPrayers[1])
    })

    test('prayers are returned as json', async () => {
        await api
            .get('/api/prayers')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all prayers are returned', async () => {
        const response = await api.get('/api/prayers').set('Authorization', `Bearer ${token}`)
        assert.strictEqual(response.body.length, initialPrayers.length)
    })

    test('timestamp field matches', async () => {
        const response = await api.get('/api/prayers').set('Authorization', `Bearer ${token}`)
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
        assert.strictEqual(formattedDateString.split(' klo ')[0], initialPrayers[0].timestamp.split(' klo ')[0])
    })


    test('content field matches', async () => {
        const response = await api.get('/api/prayers').set('Authorization', `Bearer ${token}`)
        assert.strictEqual(response.body[0].content, initialPrayers[0].content)
    })

    test('new prayer is categorized as unseen', async () => {
        const response = await api.get('/api/prayers').set('Authorization', `Bearer ${token}`)
        assert.strictEqual(response.body[0].seen, false)
    })

    test('prayer can be deleted', async () => {
        const response1 = await api.get('/api/prayers').set('Authorization', `Bearer ${token}`)
        const id = response1.body[0].id
        await api.delete(`/api/prayers/${id}`)
        const response2 = await api.get('/api/prayers').set('Authorization', `Bearer ${token}`)
        assert.strictEqual(response2.body.length, initialPrayers.length - 1)
    })

    test('seen attribute can be changed', async () => {
        const responseToGetId = await api.get('/api/prayers').set('Authorization', `Bearer ${token}`)
        const id = responseToGetId.body[0].id

        await api.put(`/api/prayers/${id}`).set('Authorization', `Bearer ${token}`)
        const responseUnseenToSeen = await api.get('/api/prayers').set('Authorization', `Bearer ${token}`)
        assert.strictEqual(responseUnseenToSeen.body[0].seen, true)

        await api.put(`/api/prayers/${id}`).set('Authorization', `Bearer ${token}`)
        const responseSeenToUnseen = await api.get('/api/prayers').set('Authorization', `Bearer ${token}`)
        assert.strictEqual(responseSeenToUnseen.body[0].seen, false)
    })
})


after(async () => {
    mongoose.connection.close()
})