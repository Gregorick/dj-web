const express = require('express');
const Router = express.Router();
const User = require('../model/usuarios');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
Router.use(cors());
process.env.SECRET_KEY = 'secret'

Router.get('/usuarios', async (req, res) => {
    const users = await User.find()
    res.json(users)
})

Router.get('/Usuarios/:id', async (req, res) => {
    const userID = await User.findOne({_id:req.params.id})
    res.json(userID)
})

Router.post('/register', (req, res) => {
   const { nombre, apellido, email, password } = req.body;
   const today = new Date;
   const userData = { nombre, apellido, email, password, fecha: today };
    User.findOne({
        email: req.body.email
    })
   .then(user => {
       if (!user) {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
              userData.password = hash
              User.create(userData)
              .then(user => {
                  res.json({Status: user.email + ' Registrado'})
              })
              .catch(err => {
                  res.send('error:' + err)
              })
          })
       } else {
           res.json({Error: 'Usuario ya registrado'})
       }
   })
   .catch( err => {
       res.send('error:' + err)
   })
})

Router.post('/login', (req, res) => {
  User.findOne({
      email:req.body.email
  })
   .then(user => {
       if (user) {
           if (bcrypt.compareSync(req.body.password, user.password)) {
               const payload = {
                  _id: user._id,
                  nombre: user.nombre,
                  apellido: user.apellido,
                  email: user.email
               }
               let token = jwt.sign(payload, process.env.SECRET_KEY, {
                  expiresIn: 1440
               })
               res.send(token)
           } else {
               res.json({Error: 'Usuario no existe'})
           }
       } else {
           res.json({Error: 'Usuario no existe'})
       }
   })
   .catch(err => {
       res.send('error:' + err)
   })
})


Router.get('/profile', (req, res) => {
    const decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    User.findOne({
        _id: decoded._id
    })
    .then(user => {
        if (user) {
            res.json(user)
        } else {
            res.send('Usuario no existe')
        }
    })
    .catch('error:' + err)
})

module.exports = Router;