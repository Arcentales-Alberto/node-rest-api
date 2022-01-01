const { Sequelize } = require('sequelize')
const chalk = require('chalk')
const logger = require('../logs/config')
const infoMessage = require('../messages/infoMessage')
const errorMessage = require('../messages/errorMessage')

const sequelize = new Sequelize('shopDB', 'root', '', {
  host: 'localhost',
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