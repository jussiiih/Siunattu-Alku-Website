const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    username: String,
    passwordHash: String
})

adminSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin