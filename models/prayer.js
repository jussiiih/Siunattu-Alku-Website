const mongoose = require('mongoose')

const prayerSchema = new mongoose.Schema({
    timestamp: String,
    content: String,

})

prayerSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Prayer = mongoose.model('Prayer', prayerSchema)

module.exports = Prayer

