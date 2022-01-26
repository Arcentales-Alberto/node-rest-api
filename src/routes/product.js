const { Router } = require('express')
const {  getProducts,  getProductById, updateProduct, 
         createProduct, deleteProduct, getProductsByCustomer 
      } = require('../controllers/productController')
const { validateCreateOrUpdate } = require('../validators/product')

const router = Router()

router.get('/', getProducts, (req, res) => {
})

router.get('/:id', getProductById, (req, res) => {
})

router.get('/customer/:id', getProductsByCustomer, (req, res) => {
})

router.post('/', validateCreateOrUpdate, createProduct, (req, res) => {
})

router.put('/:id', validateCreateOrUpdate, updateProduct, (req, res) => {
})

router.delete('/:id', deleteProduct, (req, res) => {
})

module.exports = router