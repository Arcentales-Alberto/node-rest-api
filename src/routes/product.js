const { Router } = require('express')
const {  getProducts,  getProductById, updateProduct, 
         createProduct, deleteProduct, getProductsByCustomer 
      } = require('../controllers/productController')
const { validateCreateOrUpdate } = require('../validators/product')
const { cacheInit } = require('../middleware/cache')

const router = Router()

router.get('/', cacheInit, getProducts, (req, res) => {
})

router.get('/:id', cacheInit, getProductById, (req, res) => {
})

router.get('/customer/:id', cacheInit, getProductsByCustomer, (req, res) => {
})

router.post('/', validateCreateOrUpdate, createProduct, (req, res) => {
})

router.put('/:id', validateCreateOrUpdate, updateProduct, (req, res) => {
})

router.delete('/:id', deleteProduct, (req, res) => {
})

module.exports = router