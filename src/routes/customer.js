const { Router } = require('express')
const { getCustomers, getCustomerById, createCustomer,
        updateCustomer, deleteCustomer } = require('../controllers/customerController')
const { validateCreateOrUpdate } = require('../validators/customer')
const { cacheInit } = require('../middleware/cache')

const router = Router()

router.get('/', cacheInit, getCustomers, (req, res) => {
})

router.get('/:id', cacheInit, getCustomerById, (req, res) => {

})
router.post('/', validateCreateOrUpdate, createCustomer, (req, res) => {
})

router.put('/:id', validateCreateOrUpdate, updateCustomer, (req, res) => {
})

router.delete('/:id', deleteCustomer, (req, res) => {
})

module.exports = router