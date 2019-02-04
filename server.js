const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const db = require('./config/db')

const app = express()
const port = process.env.PORT || 8000;

app.set('port', port)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

console.log(db)

MongoClient.connect(db.url, { useNewUrlParser: true }, (err, cluster) => {
    if (err) return console.log(err)
    database = cluster.db('stock')
    require('./app/routes')(app, database);
    app.listen(port, () => {
        console.log('We are live on: ' + port)
    })
})

