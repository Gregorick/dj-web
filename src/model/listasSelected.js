const mongoose = require('mongoose')
const { Schema, model } = mongoose;
const { app_config } = require('../key')

const ListaSchema = new Schema({
   tituloSelected: {
       type:String
   },
   artistaSelected: {
       type:String
   },
   albumSelected: {
       type: String
   },
   imgURLSelected: {
       type: String
   },
    fechaSelected: {
     type: String
   },
   duracionSelected: {
       type: String
   }
}, {
    timestamps: true
})

module.exports = model('listaSelected', ListaSchema);