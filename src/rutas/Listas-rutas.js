const express = require('express')
const RouterLista = express.Router()
const Lista = require('../model/listas')
const ListaSelected = require('../model/listasSelected')
const imgLista = require('../model/images')
const upload = require('../image-ipload')
singleUpload = upload.single('file');

RouterLista.get('/canciones', async (req, res) => {
 const listafind = await Lista.find();
 res.json(listafind)
})

 RouterLista.get('/canciones/selected', async (req, res) => {
    const listafindSelected = await ListaSelected.find()
    res.json(listafindSelected)
     })

RouterLista.get('/canciones/:id', async (req, res) => {
        const listafind = await Lista.findOne({_id:req.params.id});
        res.json(listafind)
       }) 
       
RouterLista.delete('/canciones/selected/:id', async ( req, res ) => {
        await ListaSelected.findOneAndDelete({_id:req.params.id});
         res.json({Status: 'Datos Eliminados Correctamente'})
      })       

RouterLista.get('/canciones/selected/:id', async (req, res) => {
    const listafind = await ListaSelected.findOne({_id:req.params.id});
    res.json(listafind)
   })  

RouterLista.get('/media', async (req, res) => {
   const ListaImages = await imgLista.find()
   res.json(ListaImages)
})

RouterLista.get('/media/:id', async (req, res) => {
    const ListaImages = await imgLista.findOne({_id: req.params.id})
    res.json(ListaImages)
 })

 RouterLista.delete('/media/:id',  async (req, res) => {
 await imgLista.findOneAndDelete({_id: req.params.id})	
  res.json({Status: 'Datos Borrados Correctamente'})
 });

RouterLista.post('/media', singleUpload, async (req, res) => {
     if (req.file) {
         const file = req.file.location      
         const newIMG = new imgLista({file})
         await newIMG.save()
         res.json({Status: req.file.location})
     }  else {
         res.json({Status: 'Imagen no cargada'})
     }

})

RouterLista.post('/canciones', async (req, res) => {
        const { titulo, artista, album, imgURL, duracion } = req.body; 
        const newLista = new Lista({titulo, artista, album, imgURL, duracion}); 
        await newLista.save();
        res.json({Status: 'Datos enviados correctamente'})   
})

RouterLista.post('/canciones/selected', async (req, res) => {
    const { tituloSelected, artistaSelected, albumSelected, imgURLSelected, duracionSelected } = req.body; 
    const newLista = new ListaSelected({tituloSelected, artistaSelected, albumSelected, imgURLSelected, duracionSelected}); 
    await newLista.save();
    res.json({Status: 'Datos enviados correctamente'})   
})

module.exports = RouterLista;