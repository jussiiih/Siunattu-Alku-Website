require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_URI = process.env.MONGODB_URI === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

const ADMIN_USERNAME = process.env.ADMIN_USERNAME
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

const SECRET = process.env.SECRET


module.exports = { MONGODB_URI, PORT, ADMIN_USERNAME, ADMIN_PASSWORD, SECRET }