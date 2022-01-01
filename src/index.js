
const chalk = require('chalk')
const app = require('./app')
const logger = require('./logs/config')
const infoMessage = require('./messages/infoMessage')

const port = process.env.APP_SERVER_PORT || 3000

async function main() {
    try {
        await app.listen(port)
        logger.debug(chalk.bgGreen.black(`${infoMessage.serverPort}${port}`))
    } catch (error) {
        logger.error(error)
    }
}

main()