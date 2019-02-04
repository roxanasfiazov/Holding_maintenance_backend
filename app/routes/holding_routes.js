var ObjectID = require('mongodb').ObjectID

module.exports = function (app, db) {
    app.get('/api/holdings', (req, resp) => {
        db.collection('holdings').find({}).toArray((err, result) => {
            if (err) resp.send({ 'error': 'An error has occured' + err })
            else resp.send(result)
        })
    })

    app.get('/api/holdings/:symbol', (req, resp) => {
        const symbol = req.params.symbol
        const details = {
            'symbol': symbol
        }
        db.collection('holdings').findOne(details, (err, item) => {
            if (err) resp.send({ 'error': 'An error has occured' + err })
            else resp.send(item)
        })
    })

    app.post('/api/holdings', (req, resp) => {
        const holding = {
            symbol: req.body.symbol,
            amount: req.body.amount
        }
        db.collection('holdings').insertOne(holding, (err, result) => {
            if (err) resp.send({ 'error': 'An error has occured' + err })
            else resp.send(result.ops[0])
        })
    })

    app.delete('/api/holdings/:symbol', (req, resp) => {
        const symbol = req.params.symbol
        const details = {
            'symbol': symbol
        }
        db.collection('holdings').deleteOne(details, (err, item) => {
            if (err) resp.send({ 'error': 'An error has occured' + err })
            else resp.send(item)
        })
    })

    app.put('/api/holdings/:symbol', (req, resp) => {
        const symbol = req.params.symbol
        const details = {
            'symbol': symbol
        }
        const holding = {
            '$set': {
                amount: req.body.amount
            }
        }
        db.collection('holdings').updateOne(details, holding, (err, item) => {
            if (err) esp.send({ 'error': 'An error has occured' + err })
            else resp.send(item)
        })
    })


}