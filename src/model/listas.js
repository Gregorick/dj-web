const mongoose = require('mongoose')
const { Schema, model } = mongoose;
const { app_config } = require('../key')

const ListaSchema = new Schema({
   titulo: {
       type:String
   },
   artista: {
       type:String
   },
   album: {
       type: String
   },
   imgURL: {
       type: String
   },
    fecha: {
     type: String
   },
   duracion: {
       type: String
   }
}, {
    timestamps: true
})

module.exports = model('lista', ListaSchema);