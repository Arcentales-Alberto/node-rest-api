const { validationResult } = require('express-validator')
const logger = require('../logs/config')

exports.validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (error) {
        res.status(403)
        res.json({ errors: error.array() })
        logger.error(error.array())
    }
} 
