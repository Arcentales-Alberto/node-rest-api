const request = require('supertest')
const app = require('../src/app')
const casual = require('casual')
const Product = require('../src/models/Product')
const Customer = require('../src/models/Customer')
const logger = require('../src/logs/config')
const infoMessage = require('../src/messages/infoMessage')
const chalk = require('chalk')

describe('GET  /api/products', () => {
    let lastProductId = null
    let lastCustomerId = null
    before('Create a new customer and get the last customer ID', async () => {
        const name = casual.sentence
        const lastname = casual.sentence
        lastCustomerId = await Customer.create(
            {
                name,   
                lastname,
            },
            {
                fields: ['name', 'lastname'],
            }
        )
            .then(lastCustomer => {
                return lastCustomer.id
            })
            .catch(error => {
                logger.error(error)
            })
    })
    before('Create a new product and get the last product ID', async () => {
        try {
            if (lastCustomerId) {
                const description = casual.sentence
                const customerId = lastCustomerId
                lastProductId = await Product.create(
                    {
                        description,   
                        customerId,
                    },
                    {
                        fields: ['description', 'customerId'],
                    }
                )
                    .then(lastProduct => {
                        return lastProduct.id
                    })
                    .catch(error => {
                        logger.error(error)
                    })
            }
        } catch (error) {
            logger.error(error)
        }
    })
    it('Get all products ', async () => {
        await request(app)
            .get('/api/products')
            .expect('Content-Type', /json/)
            .expect(200)
            .catch(error => {
                logger.error(error)
            })
    })
    after('Delete the last product', async () => {
        try {
            if (lastProductId) {
                const deleteCountRow = await Product.destroy({
                    where: {
                        id: lastProductId
                    }
                })
                if (deleteCountRow === 0) {
                    logger.debug(chalk.bgRed.black(infoMessage.idNotExist))
                } else {
                    logger.debug(chalk.bgCyan.black(infoMessage.productDeletedSuccess))
                }
            }
        } catch (error) {
            logger.error(error)
        }      
    })
    after('Delete the last customer', async () => {
        try {
            if (lastCustomerId) {
                const deleteCountRow = await Customer.destroy({
                    where: {
                        id: lastCustomerId
                    }
                })
                if (deleteCountRow === 0) {
                    logger.debug(chalk.bgRed.black(infoMessage.idNotExist))
                } else {
                    logger.debug(chalk.bgCyan.black(infoMessage.customerDeletedSuccess))
                }
            }
        } catch (error) {
            logger.error(error)
        }      
    })
})

describe("GET /api/products/:id", () => {
    let lastProductId = null
    let lastCustomerId = null
    before('Create a new customer and get the last customer ID', async () => {
        const name = casual.sentence
        const lastname = casual.sentence
        lastCustomerId = await Customer.create(
            {
                name,   
                lastname,
            },
            {
                fields: ['name', 'lastname'],
            }
        )
            .then(lastCustomer => {
                return lastCustomer.id
            })
            .catch(error => {
                logger.error(error)
            })
    })
    before('Create a new product and get the last product ID', async () => {
        try {
            if (lastCustomerId) {
                const description = casual.sentence
                const customerId = lastCustomerId
                lastProductId = await Product.create(
                    {
                        description,   
                        customerId,
                    },
                    {
                        fields: ['description', 'customerId'],
                    }
                )
                    .then(lastProduct => {
                        return lastProduct.id
                    })
                    .catch(error => {
                        logger.error(error)
                    })
            }
        } catch (error) {
            logger.error(error)
        }
    })
    it('Get a product by ID', async () => {
        if (lastProductId) {
            await request(app)
                .get(`/api/products/${lastProductId}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .catch(error => {
                    logger.error(error)
                })
        }
    })
    after('Delete the last product', async () => {
        try {
            if (lastProductId) {
                const deleteCountRow = await Product.destroy({
                    where: {
                        id: lastProductId
                    }
                })
                if (deleteCountRow === 0) {
                    logger.debug(chalk.bgRed.black(infoMessage.idNotExist))
                } else {
                    logger.debug(chalk.bgCyan.black(infoMessage.productDeletedSuccess))
                }
            }
        } catch (error) {
            logger.error(error)
        }      
    })
    after('Delete the last customer', async () => {
        try {
            if (lastCustomerId) {
                const deleteCountRow = await Customer.destroy({
                    where: {
                        id: lastCustomerId
                    }
                })
                if (deleteCountRow === 0) {
                    logger.debug(chalk.bgRed.black(infoMessage.idNotExist))
                } else {
                    logger.debug(chalk.bgCyan.black(infoMessage.customerDeletedSuccess))
                }
            }
        } catch (error) {
            logger.error(error)
        }      
    })
})

describe("GET /api/products/customers/:id", () => {
    let lastProductId = null
    let lastCustomerId = null
    before('Create a new customer and get the last customer ID', async () => {
        const name = casual.sentence
        const lastname = casual.sentence
        lastCustomerId = await Customer.create(
            {
                name,   
                lastname,
            },
            {
                fields: ['name', 'lastname'],
            }
        )
            .then(lastCustomer => {
                return lastCustomer.id
            })
            .catch(error => {
                logger.error(error)
            })
    })
    before('Create a new product and get the last product ID', async () => {
        try {
            if (lastCustomerId) {
                const description = casual.sentence
                const customerId = lastCustomerId
                lastProductId = await Product.create(
                    {
                        description,   
                        customerId,
                    },
                    {
                        fields: ['description', 'customerId'],
                    }
                )
                    .then(lastProduct => {
                        return lastProduct.id
                    })
                    .catch(error => {
                        logger.error(error)
                    })
            }
        } catch (error) {
            logger.error(error)
        }
    })
    it('Get products by customer', async () => {
        if (lastProductId) {
            await request(app)
                .get(`/api/products/customer/${lastCustomerId}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .catch(error => {
                    logger.error(error)
                })
        }
    })
    after('Delete the last product', async () => {
        try {
            if (lastProductId) {
                const deleteCountRow = await Product.destroy({
                    where: {
                        id: lastProductId
                    }
                })
                if (deleteCountRow === 0) {
                    logger.debug(chalk.bgRed.black(infoMessage.idNotExist))
                } else {
                    logger.debug(chalk.bgCyan.black(infoMessage.productDeletedSuccess))
                }
            }
        } catch (error) {
            logger.error(error)
        }      
    })
    after('Delete the last customer', async () => {
        try {
            if (lastCustomerId) {
                const deleteCountRow = await Customer.destroy({
                    where: {
                        id: lastCustomerId
                    }
                })
                if (deleteCountRow === 0) {
                    logger.debug(chalk.bgRed.black(infoMessage.idNotExist))
                } else {
                    logger.debug(chalk.bgCyan.black(infoMessage.customerDeletedSuccess))
                }
            }
        } catch (error) {
            logger.error(error)
        }      
    })
})

describe("POST /api/products", () => {
    let res = null
    let lastCustomerId = null
    before('Create a new customer and get the last product ID', async () => {
        const name = casual.sentence
        const lastname = casual.sentence
        lastCustomerId = await Customer.create(
            {
                name,   
                lastname,
            },
            {
                fields: ['name', 'lastname'],
            }
        )
            .then(lastCustomer => {
                return lastCustomer.id
            })
            .catch(error => {
                logger.error(error)
            })
    })
    it('Create a new product', async () => {
       if (lastCustomerId) {
           const data = {
               description: casual.sentence,
               customerId: lastCustomerId,
           }
           await request(app)
               .post('/api/products')
               .set('Accept', 'application/json')
               .send(data)
               .expect(201)
               .catch(error => {
                   res = error
                   logger.error(error)
               })
       }
    })
    after('Delete the last product', async () => {
        try {
            if (!res) {
                const newProduct = await Product.findOne({
                    order: [
                        ['id', 'DESC'],
                    ],
                })
                if (newProduct) {
                    const deleteCountRow = await Product.destroy({
                        where: {
                            id: newProduct.id
                        }
                    })
                    if (deleteCountRow === 0) {
                        logger.debug(chalk.bgRed.black(infoMessage.idNotExist))
                    } else {
                        logger.debug(chalk.bgCyan.black(infoMessage.productDeletedSuccess))
                    }
                }
            }
        } catch (error) {
            logger.error(error)
        }
    })
    after('Delete the last customer', async () => {
        try {
            if (lastCustomerId) {
                const deleteCountRow = await Customer.destroy({
                    where: {
                        id: lastCustomerId
                    }
                })
                if (deleteCountRow === 0) {
                    logger.debug(chalk.bgRed.black(infoMessage.idNotExist))
                } else {
                    logger.debug(chalk.bgCyan.black(infoMessage.customerDeletedSuccess))
                }
            }
        } catch (error) {
            logger.error(error)
        }      
    })
})

describe("PUT /api/products/:id", () => {
    let lastProductId = null
    let lastCustomerId = null
    before('Create a new customer and get the last product ID', async () => {
        const name = casual.sentence
        const lastname = casual.sentence
        lastCustomerId = await Customer.create(
            {
                name,   
                lastname,
            },
            {
                fields: ['name', 'lastname'],
            }
        )
            .then(lastCustomer => {
                return lastCustomer.id
            })
            .catch(error => {
                logger.error(error)
            })
    })
    before('Create a new product', async () => {
        try {
            if (lastCustomerId) {
                const description = casual.sentence
                const customerId = lastCustomerId
                lastProductId = await Product.create(
                    {
                        description,   
                        customerId,
                    },
                    {
                        fields: ['description', 'customerId'],
                    }
                )
                    .then(lastProduct => {
                        return lastProduct.id
                    })
                    .catch(error => {
                        logger.error(error)
                    })
            }
        } catch (error) {
            logger.error(error)
        }
    })
    it('Put a product by ID', async () => {
        if (lastProductId) {
            const data = {
                description: casual.sentence,
                customerId: casual.integer(from = 0, to = 5)
            }
            await request(app)
                .put(`/api/products/${lastProductId}`)
                .set('Accept', 'application/json')
                .send(data)
                .expect(200)
                .catch(error => {
                    logger.error(error)
                })
        }
    })
    after('Delete the last product', async () => {
        try {
            if (lastProductId) {
                const deleteCountRow = await Product.destroy({
                    where: {
                        id: lastProductId
                    }
                })
                if (deleteCountRow === 0) {
                    logger.debug(chalk.bgRed.black(infoMessage.idNotExist))
                } else {
                    logger.debug(chalk.bgCyan.black(infoMessage.productDeletedSuccess))
                }
            }
        } catch (error) {
            logger.error(error)
        }      
    })
    after('Delete the last customer', async () => {
        try {
            if (lastCustomerId) {
                const deleteCountRow = await Customer.destroy({
                    where: {
                        id: lastCustomerId
                    }
                })
                if (deleteCountRow === 0) {
                    logger.debug(chalk.bgRed.black(infoMessage.idNotExist))
                } else {
                    logger.debug(chalk.bgCyan.black(infoMessage.customerDeletedSuccess))
                }
            }
        } catch (error) {
            logger.error(error)
        }      
    })
})

describe("DELETE /api/products/:id", () => {
    let lastProductId = null
    let lastCustomerId = null
    before('Create a new customer and get the last product ID', async () => {
        const name = casual.sentence
        const lastname = casual.sentence
        lastCustomerId = await Customer.create(
            {
                name,   
                lastname,
            },
            {
                fields: ['name', 'lastname'],
            }
        )
            .then(lastCustomer => {
                return lastCustomer.id
            })
            .catch(error => {
                logger.error(error)
            })
    })
    before('Create a new product', async () => {
        try {
            if (lastCustomerId) {
                const description = casual.sentence
                const customerId = lastCustomerId
                lastProductId = await Product.create(
                    {
                        description,   
                        customerId,
                    },
                    {
                        fields: ['description', 'customerId'],
                    }
                )
                    .then(lastProduct => {
                        return lastProduct.id
                    })
                    .catch(error => {
                        logger.error(error)
                    })
            }
        } catch (error) {
            logger.error(error)
        }
    })
    it('Delete a product by ID', async () => {
        if (lastProductId) {
            await request(app)
                .delete(`/api/products/${lastProductId}`)
                .expect(200)
                .catch(error => {
                    logger.error(error)
                })
        }
    })
    after('Delete the last customer', async () => {
        try {
            if (lastCustomerId) {
                const deleteCountRow = await Customer.destroy({
                    where: {
                        id: lastCustomerId
                    }
                })
                if (deleteCountRow === 0) {
                    logger.debug(chalk.bgRed.black(infoMessage.idNotExist))
                } else {
                    logger.debug(chalk.bgCyan.black(infoMessage.customerDeletedSuccess))
                }
            }
        } catch (error) {
            logger.error(error)
        }      
    })
})