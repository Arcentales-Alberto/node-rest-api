const getExpeditiousCache = require('express-expeditious')

const cacheInit = getExpeditiousCache({
    namespace: 'expresscache',
    defaultTtl: '5 minute',
    statusCodeExpires: {
        500: '1 minute'
    }
})

module.exports = { cacheInit }