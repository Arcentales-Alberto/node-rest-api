const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')
const validationMessage = require('../messages/validationMessage')

const validateCreateOrUpdate = [
    check('name', validationMessage.nameRequired)
        .exists(),
    check('name', validationMessage.nameNotEmpty)
        .not()
        .isEmpty(),
    check('name', validationMessage.nameNotNumeric)
        .not()
        .isNumeric(),
    check('lastname', validationMessage.lastnameRequired)
        .exists(),
    check('lastname', validationMessage.lastnameNotEmpty)
        .not()
        .isEmpty(),
    check('lastname', validationMessage.lastnameNotNumeric)
        .not()
        .isNumeric(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]


module.exports = { validateCreateOrUpdate }