const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')
const validationMessage = require('../messages/validationMessage')

const validateCreateOrUpdate = [
    check('description',validationMessage.descriptionRequired )
        .exists(),
    check('description', validationMessage.descriptionNotEmpty)
        .not()
        .isEmpty(),
    check('description', validationMessage.descriptionNotNumeric)
        .not()
        .isNumeric(),
    check('customerId', validationMessage.customerIdRequired)
        .exists(),
    check('customerId', validationMessage.customerIdNnotEmpty)
        .not()
        .isEmpty(),
    check('customerId', validationMessage.customerIdNumeric)
        .isNumeric(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreateOrUpdate }