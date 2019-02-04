const ObjectID = require('mongodb').ObjectID

module.exports = function (app, db) {
    app.get('/api/allocations', (req, resp) => {
        db.collection('allocations').find({}).toArray((err, result) => {
            if (err) resp.send({ 'error': 'An error has occured' })
            else resp.send(result)
        })
    })

    app.get('/api/allocations/:symbol', (req, resp) => {
        const symbol = req.params.symbol
        const details = {
            'symbol': symbol
        }
        db.collection('allocations').findOne(details, (err, item) => {
            if (err) resp.send({ 'error': 'An error has occured' })
            else resp.send(item)
        })
    })

    app.post('/api/allocations', (req, resp) => {
        const allocation = {
            symbol: req.body.symbol,
            percentage: req.body.percentage
        }
        db.collection('allocations').insertOne(allocation, (err, result) => {
            if (err) resp.send({ 'error': 'An error has occured' })
            else resp.send(result.ops[0])
        })
    })

    app.delete('/api/allocations/:symbol', (req, resp) => {
        const symbol = req.params.symbol
        const details = {
            'symbol': symbol
        }
        db.collection('allocations').deleteOne(details, (err, item) => {
            if (err) resp.send({ 'error': 'An error has occured' })
            else resp.send(item)
        })
    })

    app.put('/api/allocations/:symbol', (req, resp) => {
        const symbol = req.params.symbol
        const details = {
            'symbol': symbol
        }
        const allocation = {
            '$set': {
                percentage: req.body.percentage
            }
        }
        db.collection('allocations').updateOne(details, allocation, (err, item) => {
            if (err) resp.send({ 'error': 'An error has occured ' + err })
            else resp.send(item)
        })
    })


}