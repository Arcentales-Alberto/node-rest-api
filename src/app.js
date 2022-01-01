const express = require('express')
const customerRoutes = require('./routes/customer')
const productRoutes = require('./routes/product')

const app = express()
app.use(express.json())
app.use('/api/customers', customerRoutes)
app.use('/api/products', productRoutes)


module.exports = app