const { createLogger, format, transports, transport } = require('winston')

module.exports = createLogger({
    format: format.combine(
        format.simple(),
        format.timestamp(),
        format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)

    ),
    transports: [
        new transports.File({
            filename: `${__dirname}/../logs/api.log`,
        }),
        new transports.Console({
            level: 'debug'
        })
    ]
})