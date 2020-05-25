const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const server = express()
const { mongoose } = require('./database')
const path = require('path');



// Configuraciones
server.set('port', process.env.PORT || 4000)
// const storage = multer.diskStorage({
//     destination: path.join(__dirname, 'storage/img'),
//     filename: (req, file, cb) => {
//         cb(null, new Date().getTime() + path.extname(file.originalname));
//     }
// })
// server.use(multer({Multerstorage}).single('file'));
server.use('/public', express.static(path.join(__dirname, 'storage/img')))
server.use(express.json())
server.use(morgan('dev'))
server.use(cors())
server.use(express.urlencoded({
    extended: false
}))
// Rutas
server.use('/users', require('./rutas/usuarios'))
server.use('/listas', require('./rutas/Listas-rutas'))
// Inicializando Servidor
server.listen(server.get('port'), () => {
   console.log(`Servidor conectado al puerto ${server.get('port')}`)
})