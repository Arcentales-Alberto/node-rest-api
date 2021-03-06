const { Sequelize } = require('sequelize')
const { sequelize } = require('../database/database')

const Product = sequelize.define('products', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: Sequelize.TEXT
    },
    customerId: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false
})


module.exports = Product