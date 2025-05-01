const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    messageType: String,
    timestamp: String,
    name: String,
    phoneNumber: String,
    email: String,
    content: String,
    feedbackPublic: String
})

messageSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message

