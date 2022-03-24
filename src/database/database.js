const { Sequelize } = require('sequelize')
const chalk = require('chalk')
const logger = require('../logs/config')
const infoMessage = require('../messages/infoMessage')
const errorMessage = require('../messages/errorMessage')
const { DB_PORT, DB_NAME, DB_HOSTNAME, DB_USERNAME, DB_PASSWORD } = require('../config/config')

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOSTNAME,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false
})
async function verifyConnection() {
  try {
    await sequelize.authenticate()
    logger.debug(chalk.bgGreen.black(infoMessage.connectionEnabled))
  } catch (error) {
    logger.error(chalk.bgRed.black(`${errorMessage.connectionDisabled}${error}`))
  }
}

verifyConnection()

module.exports = { sequelize } 