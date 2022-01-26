const {Sequelize} = require('sequelize')
const { sequelize } = require('../database/database')
const Product = require('./Product')

const Customer = sequelize.define('Customers', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.TEXT
    },
    lastname: {
        type: Sequelize.TEXT
    }
}, {
    timestamps: false
})

Customer.hasMany(Product, { foreignKey: 'customerId', sourceKey: 'id' })
Product.belongsTo(Customer, { foreignKey: 'customerId', sourceKey: 'id' })

module.exports = Customer