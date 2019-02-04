const request = require('request-promise')
const Promise = require('bluebird')
const ObjectID = require('mongodb').ObjectID

const base_url = 'https://www.alphavantage.co/query?'
const url_function = 'GLOBAL_QUOTE'
const api_key = 'BPQ7ODWXA72SJ5XW'

async function getQuoteForSymbol(symbol, db) {
    const filterQuote = {
        'symbol': ''
    }
    const resultQuote = {
        'symbol': '',
        'price': 0.0,
        'tradingDay': ''
    }
    const quoteReponse = await request({
        uri: base_url,
        qs: {
            function: url_function,
            symbol: symbol,
            apikey: api_key
        },
        json: true
    })

    if (typeof quoteReponse['Global Quote'] == 'undefined') {
        filterQuote.symbol = symbol
        console.log(filterQuote)
        const item = await db.collection('quotes').findOne(filterQuote)
        resultQuote.symbol = item.symbol
        resultQuote.price = item.price
        resultQuote.tradingDay = item.tradingDay
        console.log('DB branch:')
        console.log(resultQuote)
        return resultQuote
    } else {
        resultQuote.symbol = quoteReponse['Global Quote']['01. symbol']
        resultQuote.price = quoteReponse['Global Quote']['05. price']
        resultQuote.tradingDay = quoteReponse['Global Quote']['07. latest trading day']

        filterQuote.symbol = resultQuote.symbol
        const newQuote = {
            '$set': {
                'price': resultQuote.price,
                'tradingDay': resultQuote.tradingDay
            }
        }
        const result = await db.collection('quotes').updateOne(filterQuote, newQuote, { upsert: true, new: true })
        console.log('API branch:')
        console.log(resultQuote)
        return (resultQuote)
    }
}

module.exports = function (app, db) {

    app.get('/api/quotes', (req, resp) => {
        db.collection('symbols').find({}).toArray((err, symbols) => {
            if (err) resp.send({ 'error': 'An error has occured' })
            else {
                const quotePromises = symbols.map(symbol =>
                    getQuoteForSymbol(symbol.shortcut, db)
                )
                const solvedPromise = Promise.all(quotePromises)
                    .then(resultQuotes => {
                        return resp.send(resultQuotes)
                    }).catch((err) => resp.send({ 'error': 'An error has occured' }))
            }
        })
    })
}