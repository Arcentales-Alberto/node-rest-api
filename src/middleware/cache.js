const getExpeditiousCache = require('express-expeditious')

const cacheInit = getExpeditiousCache({
    namespace: 'expresscache',
    engine : require('expeditious-engine-memory')(), 
    defaultTtl: '5 minute',
    statusCodeExpires: {
        500: '1 minute'
    }
})

module.exports = { cacheInit }