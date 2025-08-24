require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_URI = process.env.MONGODB_URI === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

const ADMIN_USERNAME = process.env.ADMIN_USERNAME
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

const SECRET = process.env.SECRET

const CRYPT_KEY = process.env.CRYPT_KEY

const CRYPT_ALGORITH = process.env.CRYPT_ALGORITH

module.exports = { MONGODB_URI, PORT, ADMIN_USERNAME, ADMIN_PASSWORD, SECRET, CRYPT_KEY, CRYPT_ALGORITH }