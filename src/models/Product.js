const { Sequelize } = require('sequelize')
const { sequelize } = require('../database/database')

const Product = sequelize.define('Products', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
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