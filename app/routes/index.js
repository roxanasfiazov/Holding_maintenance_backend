const symbolRoutes = require('./symbol_routes')
const allocationRoutes = require('./allocation_routes')
const holdingRoutes = require('./holding_routes')
const quoteRoutes = require('./quote_routes')

module.exports = function(app, db) {
    symbolRoutes(app, db)
    allocationRoutes(app, db)
    holdingRoutes(app, db)
    quoteRoutes(app, db)

}