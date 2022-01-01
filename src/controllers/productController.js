const Product = require('../models/Product')
const errorMessage = require('../messages/errorMessage')
const infoMessage = require('../messages/infoMessage')

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json({ data: products })
    } catch (error) {
        res.status(500).json({ message: errorMessage.dataNotObtained })
    }

}

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findOne({
            where: {
                id
            }
        })
        if (product) {
            res.status(200).json({ data: product })
        } else {
            res.status(200).json({ message: infoMessage.idNotExist })
        }
    } catch (error) {
        res.status(500).json({ message: errorMessage.dataNotObtained })
    }
}

exports.getProductsByCustomer = async (req, res) => {
    try {
        const { customerId } = req.params
        const products = await Product.findAll({
            where: { customerId }
        })
        if (products.length > 0) {
            res.status(200).json({ products })
        } else {
            res.status(200).json({ data: infoMessage.noData })
        }
    } catch (error) {
        res.status(500).json({ data: errorMessage.dataNotObtained })
    }
}

exports.createProduct = async (req, res) => {
    try {
        const { description, customerId } = req.body
        let newProduct = await Product.create(
            {
                description,
                customerId,
            },
            {
                fields: ['description', 'customerId'],
            }
        )
        if (newProduct) {
            res.status(201).json({ message: infoMessage.productCreatedSuccess })
        }
    } catch (error) {
        res.status(500).json({ message: errorMessage.somethingGoesWrong })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { description, customerId } = req.body
        const products = await Product.findAll({
            attributes: ['description', 'customerId'],
            where: {
                id
            }
        })

        if (products.length > 0) {
            products.forEach(async product => {
                await product.update({
                    id,
                    description,
                    customerId
                })
            })
            res.status(200).json({
                message: infoMessage.productUpdatedSuccess
            })
        } else {
            res.status(200).json({
                message: infoMessage.idNotExist
            })
        }
    } catch (error) {
        res.status(500).json({ message: errorMessage.somethingGoesWrong })
    }

}

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const deleteCountRow = await Product.destroy({
            where: {
                id
            }
        })
        if (deleteCountRow === 0) {
            res.status(200).json({
                message: infoMessage.idNotExist
            })
        } else {
            res.status(200).json({
                message: infoMessage.productDeletedSuccess,
            })
        }
    } catch (error) {
        res.status(500).json({ message: errorMessage.somethingGoesWrong })
    }

}



