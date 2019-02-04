var ObjectID = require('mongodb').ObjectID

module.exports = function (app,db) {
    app.get('/api/symbols', (req, resp) => {
        db.collection('symbols').find({}).toArray((err, result) => {
            if (err) resp.send({error: 'An error has occured'})
            else resp.send(result)
        })
    })
}