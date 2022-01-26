const request = require('supertest')
const app = require('../src/app')
const casual = require('casual')
const Customer = require('../src/models/Customer')
const logger = require('../src/logs/config')
const infoMessage = require('../src/messages/infoMessage')
const chalk = require('chalk')

describe('GET /api/customers', () => {
    let lastCustomerId = null
    before('Create a new customer and the last customer ID', async () => {
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
    it('Get all customers ',  async () => {
        await request(app)
            .get('/api/customers')
            .expect('Content-Type', /json/)
            .expect(200)
            .catch( error => {
                logger.error(error)
            })
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

describe("GET /api/customers/:id", () => {
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
    it('Get a customer by ID', async () => {
        if (lastCustomerId) {
            await request(app)
                .get(`/api/customers/${lastCustomerId}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .catch( error => {
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

describe("POST /api/customers", () => {
    let res = null
    it('Create a new customer', async () => {
        const data = {
            name: casual.sentence,
            lastname: casual.sentence,
        }
        await request(app)
            .post('/api/customers')
            .set('Accept', 'application/json')
            .send(data)
            .expect(201)
            .catch(error => {
                res = error
                logger.error(error)
            })

    })
    after('Delete the last customer', async () => {
        try {
            if (!res) {
                const newCustomer = await Customer.findOne({
                    order: [
                        ['id', 'DESC'],
                    ],
                })
                if (newCustomer) {
                    const deleteCountRow = await Customer.destroy({
                        where: {
                            id: newCustomer.id
                        }
                    })
                    if (deleteCountRow === 0) {
                        logger.debug(chalk.bgRed.black(infoMessage.idNotExist))
                    } else {
                        logger.debug(chalk.bgCyan.black(infoMessage.customerDeletedSuccess))
                    }
                }
            }
        } catch (error) {
            logger.error(error)
        }
    })
})

describe("PUT /api/customers/:id", () => {
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
    it('Put a customer by ID', async () => {
        if (lastCustomerId) {
            const data = {
                name: casual.sentence,
                lastname: casual.sentence
            }
            await request(app)
                .put(`/api/customers/${lastCustomerId}`)
                .set('Accept', 'application/json')
                .send(data)
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

describe("DELETE /api/customers/:id", () => {
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
    it('Delete a customer by ID', async () => {
        if (lastCustomerId) {
            await request(app)
                .delete(`/api/customers/${lastCustomerId}`)
                .expect(200)
                .catch(error => {
                    logger.error(error)
                })
        }
    })
})