const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB: ', error.message)
    })

const messageSchema = new mongoose.Schema({
    timestamp: String,
    name: String,
    phoneNumber: String,
    email: String,
    content: String,
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

