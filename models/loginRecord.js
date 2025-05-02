const mongoose = require('mongoose')

const loginRecordSchema = new mongoose.Schema({
    username: String,
    timestamp: Date,
    ip: String,
    userAgent: String,
    location: String
})

module.exports = mongoose.model('LoginRecord', loginRecordSchema)
