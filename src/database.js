const mongoose = require('mongoose')
const { mongodb_URI } = require('./key')

const URI = mongodb_URI.URI;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(db => {
            console.log('Based de datos conectada')
        })
        .catch(err => {
            console.error(err)
        });

module.exports = mongoose