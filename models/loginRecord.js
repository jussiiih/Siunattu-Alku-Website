const mongoose = require('mongoose')

const loginRecordSchema = new mongoose.Schema({
    username: String,
    timestamp: String,
    ip: String,
    userAgent: String,
    location: String
})

loginRecordSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('LoginRecord', loginRecordSchema)
