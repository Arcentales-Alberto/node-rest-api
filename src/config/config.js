require('dotenv').config()

const SERVER_PORT = process.env.APP_SERVER_PORT
const DB_HOSTNAME = process.env.DATABASE_HOSTNAME
const DB_PORT = process.env.DATABASE_PORT
const DB_USERNAME = process.env.DATABASE_USERNAME
const DB_PASSWORD = process.env.DATABASE_PASSWORD
const DB_NAME = process.env.DATABASE_NAME

module.exports = { SERVER_PORT, DB_HOSTNAME, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME }
