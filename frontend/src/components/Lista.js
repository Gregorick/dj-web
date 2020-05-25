import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

export default class Lista extends Component {

    constructor() {
        super()
        this.state = {
            selectedSongs: [],
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
        }  catch {
             this.setState({
                 error: {
                     msg: 'Debes de estar conectado'
                 }
             })
        }

       this.mostrarSelectedSongs()
      setTimeout('document.location.reload()', 10000)  
    }

    mostrarSelectedSongs = async () => {
        const res = await axios.get('https://dj-node.herokuapp.com/listas/canciones/selected')
        this.setState({
            selectedSongs: res.data
        }) 
    }

    deleteSong = async id => {
        if (window.confirm("Estas seguro que quieres borrar esta canción?")) {
            await axios.delete('https://dj-node.herokuapp.com/listas/canciones/selected/' + id)
            this.mostrarSelectedSongs()
        }
    }

    render() {
     if (this.state.email) {
        return (
            <div className="cancionseleccionada">
                <div className="listacanciones">
                    <table className="table table-hover">
                        <tbody>
                            <tr className="titulo">
                                <th>orden</th>
                                <th>Artista</th>
                                <th>Canción</th>
                                <th>Albúm</th>
                                <th>Duración</th>
                                </tr>
                            {
                                Array.isArray(this.state.selectedSongs) && this.state.selectedSongs.map(cancion => (
                                    <tr key={cancion._id} className="detalles">
                                        <th className="count"></th>
                                        <th>{cancion.artistaSelected}</th>
                                        <th>{cancion.tituloSelected}</th>
                                        <th>{cancion.albumSelected}</th>
                                        <th>{cancion.duracionSelected}</th>
                                        <th><button onClick={() => this.deleteSong(cancion._id)}><i className="fas fa-trash"></i></button></th>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
     } else {
         return <p className="error">{this.state.error.msg}</p>
     }
    }
}
