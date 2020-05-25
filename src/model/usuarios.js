const mongoose = require('mongoose')
const { Schema, model } = mongoose

const newSchema = new Schema({
    nombre: {
     type: String
    },
    apellido: {
     type: String
    },
    email: {
        type: String
    },
    password: {
        type: String    
    },
    fecha: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('usuarios', newSchema)