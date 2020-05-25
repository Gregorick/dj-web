const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const imageSchema = new Schema({
    file: String
})

module.exports = model('files', imageSchema);