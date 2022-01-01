const Customer = require('../models/Customer')
const errorMessage = require('../messages/errorMessage')
const infoMessage = require('../messages/infoMessage')
const logger = require('../logs/config')

exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.status(200).json({ data: customers })
    } catch (error) {
        res.status(500).json({ message: errorMessage.dataNotObtained })
        logger.error(error)
    }
}

exports.getCustomerById = async (req, res) => {
    try {
        const { id } = req.params
        const customer = await Customer.findOne({
            where: {
                id
            }
        })
        if(customer) {
            res.status(200).json({ data: customer })
        } else {
            res.status(200).json({ message: infoMessage.idNotExist })
        }
    } catch (error) {
        res.status(500).json({ message: errorMessage.dataNotObtained })
        logger.error(error)
    }
}

exports.createCustomer = async (req, res) => {
    try {
        const { name, lastname } = req.body
        let newCustomer = await Customer.create(
            {
                name,
                lastname,
            },
            {
                fields: ['name', 'lastname'],
            }
        )
        if (newCustomer) {
            res.status(201).json({ message: infoMessage.customerCreatedSuccess })
        }
    } catch (error) {
        res.status(500).json({ message: errorMessage.somethingGoesWrong })
        logger.error(error)
    }
}

exports.updateCustomer = async (req, res) => {
    try {
        const { id } = req.params
        const { name, lastname } = req.body
        const customers = await Customer.findAll({
            attributes: ['name', 'lastname'],
            where: {
                id
            }
        })
    
        if (customers.length > 0) {
            customers.forEach(async customer => {
                await customer.update({
                    id,
                    name,
                    lastname
                })
            })
            res.status(200).json({
                message: infoMessage.customerUpdatedSuccess
            })
        } else {
            res.status(200).json({
                message: infoMessage.idNotExist
            })
        }
    } catch (error) {
        res.status(500).json({ message: errorMessage.somethingGoesWrong })
        logger.error(error)
    }
}

exports.deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params
        const deleteCountRow = await Customer.destroy({
            where: {
                id
            }
        })
        if(deleteCountRow === 0) {
            res.status(200).json({
                message: infoMessage.idNotExist,
            })
        } else {
            res.status(200).json({
                message: infoMessage.customerDeletedSuccess
            })
        }
    } catch (error) {
        res.status(500).json({ message: errorMessage.somethingGoesWrong })
        logger.error(error)
    }
}

