import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

export default class SelectLista extends Component {

    constructor() {
        super()
        this.state = {
            tituloSelected: '',
            artistaSelected: '',
            albumSelected: '',
            imgURLSelected: '',
            duracionSelected: '',
            canciones: [],
            email: '',
            error: {
                msg: ''
            }
        }
    }
  
    componentDidMount() {
        try {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            email: decoded.email
        })
  
        } catch {
          this.setState({
              error: {
                  msg: 'Debes de estar conectado'
              }
          })
        }
        this.mostrarcanciones()
    }

   addSelected = async id => {
    const res = await axios.get('https://dj-node.herokuapp.com/listas/canciones/' + id)
    this.setState({
        tituloSelected: res.data.titulo,
        artistaSelected: res.data.artista,
        albumSelected: res.data.album,
        imgURLSelected: res.data.imgURL,
        duracionSelected: res.data.duracion  
    })
    const CancionSelected = {
        tituloSelected: this.state.tituloSelected,
        artistaSelected: this.state.artistaSelected,
        albumSelected: this.state.albumSelected,
        imgURLSelected: this.state.imgURLSelected,
        duracionSelected: this.state.duracionSelected
    }
    await axios.post('https://dj-node.herokuapp.com/listas/canciones/selected', CancionSelected)
    alert("Canción Seleccionada")
   }

    mostrarcanciones = async () => {
      const res = await axios.get('https://dj-node.herokuapp.com/listas/canciones')
       this.setState({
           canciones: res.data           
       })
    }

    render() {
           if (this.state.email) {
            return (
                <div className="listacanciones">
                    <div className="gridcanciones">
                         {
                             Array.isArray(this.state.canciones) && this.state.canciones.map(cancion => (
                            <div key={cancion._id} className="caja">
                                <div className="imagen"> <img src={cancion.imgURL} alt=""/></div>
                                <div className="artista"><p>Artista: {cancion.artista}</p></div>
                                 <div className="titulo"><p>Canción: {cancion.titulo}</p></div>
                                 <div className="album"><p>Album: {cancion.album}</p></div>
                                 <div className="duracion"><div className="flexbox"><p>Duración: {cancion.duracion}</p><div className="agregar" onClick={() => this.addSelected(cancion._id)}><i className="fas fa-plus"></i> Agregar</div></div></div>
                            </div>
                             ))
                         }
                    </div>
                </div>
             )
           } else {
               return <p className="error">{this.state.error.msg}</p>
           }
    }
}
