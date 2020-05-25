import React, { Component, Fragment } from 'react'
import jwt_decode from 'jwt-decode'
import DiscoJ from '../img/discoejemplo.jpg'
import axios from 'axios'

export default class CreateLista extends Component {

    constructor() {
        super()
        this.state = {
            titulo: '',
            artista: '',
            album: '',
            imgURL: '',
            imgFile: '',
            duracion: '',
            imagenes: [],
            email: '',
            FileSelected: '',
            error: {
                msg: ''
            }
        }
    }

    async componentDidMount() {
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

        this.mostrarImagenes()    
    }

    mostrarImagenes = async () => {
        const res = await axios.get('https://dj-node.herokuapp.com/listas/media')           
        this.setState({
            imagenes: res.data
        })
    }
    

    handleSubmit = async e => {
        e.preventDefault()
        const listas = {
            titulo : this.state.titulo,
            artista: this.state.artista,
            album: this.state.album,
            duracion: this.state.duracion,
            imgURL: this.state.imgFile
        }
        await axios.post('https://dj-node.herokuapp.com/listas/canciones', listas)
        this.setState({
            titulo: '',
            artista: '',
            album: '',
            imgFile: '',
            _id: '',
            duracion: ''
        })
        alert("Datos enviados")
        
    }

    handleImage = () => {
        const imageModal =  document.querySelector('.imagenmodal')
        const buttonimage = document.querySelector('.caratula button.btninput')
        if ( buttonimage.classList.contains('cerrar') ) {
          this.setState({
              imgFile: ''
          })
          buttonimage.innerHTML = "Agregar imagen"
          buttonimage.classList.remove('cerrar')
        }  else {
            imageModal.classList.add('activo')
        }
        
    }

    closeMedia = () => {
        const imageModal =  document.querySelector('.imagenmodal')
        imageModal.classList.remove('activo')
    }


    selectImage = async file => {
       const imageModal =  document.querySelector('.imagenmodal')
       const buttonimage = document.querySelector('.caratula button.btninput')
       this.setState({
        imgFile: file
    }) 
    imageModal.classList.remove('activo')
    buttonimage.classList.add('cerrar')
    buttonimage.innerHTML = "Quitar"
    }

    subirImagen = async e => {
      e.preventDefault()
      const fd = new FormData()
      fd.append('file', this.state.FileSelected, this.state.FileSelected.name)
      await axios.post('https://dj-node.herokuapp.com/listas/media', fd)
      alert("Datos enviados")
      this.setState({
          FileSelected: ''
      })
      this.mostrarImagenes()
    }

    borrarImagen = async id => {
      if ( window.confirm("Seguro Que quieres borrar esta imagen?") ) {
        await axios.delete(`https://dj-node.herokuapp.com/listas/media/${id}`)
        alert("Imagen borrada correctamente")
        this.mostrarImagenes()
      }
    }


    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleFile = (e) => {
     this.setState({
         FileSelected: e.target.files[0]
     })
    }
 
    handleChangeMusic = e => {       
        this.setState({
            imgURL : e.target.files[0]
        })
    }

    render() {
        if (this.state.email) {
            return (
                <React.Fragment>
                <div className="createMusic">
                 <form onSubmit={this.handleSubmit}>
                    <div className="flexbox">
                            <div className="caratula">
                            <img src={this.state.imgFile || DiscoJ} alt=""/>
                            <div className="flexbox">
                            <input type="text" value={this.state.imgFile} onChange={this.handleChange} name="imgURL" placeholder="Aquí irá la imagen" />
                            <button onClick={this.handleImage} type="button" className="btninput">Agregar imagen</button>
                            </div>
                        </div>
                        <div className="formulario">
                                 <h3>Agrega tu canción preferida</h3> 
                                <input value={this.state.titulo} onChange={this.handleChange} name="titulo" type="text" placeholder="Titulo..." />
                                <input value={this.state.artista} onChange={this.handleChange} name="artista" type="text" placeholder="Artista..." />
                                <input value={this.state.album} onChange={this.handleChange} name="album" type="text" placeholder="Album..."/>
                                <input value={this.state.duracion} onChange={this.handleChange} name="duracion" type="text" placeholder="Duración..."/>
                                <input className="btninput" type="submit" value="Subir Canción" />
                        </div>
                    </div>
                    </form>                    
                </div>
                {/* Hola */}
                <div className="imagenmodal">
                    <div className="contenedor">
                        <div className="flexbox">
                            <div className="cerrar">
                                <button onClick={this.closeMedia} ><i className="fas fa-times"></i></button>
                            </div>
                             <div className="subirImagen">
                                 <div className="titulo">
                                     <h3>Subir Imagen</h3>
                                 </div>
                                 <div className="formulario">
                                     <form onSubmit={this.subirImagen}>
                                         <input type="file" onChange={this.handleFile} />
                                         <input type="submit" className="btnmusic" value="Subir Imagen" />
                                     </form>
                                 </div>
                             </div>
                             <div className="mostrarimagen">
                             <div className="titulo">
                                     <h3>Seleccionar Imagenes</h3>
                                 </div>
                                 <div className="gridimagenes">
                                     {
                                         Array.isArray(this.state.imagenes) && this.state.imagenes.map( imagen =>  (
                                           <div key={imagen._id} className="imagencompleta">
                                               <div onClick={() => this.borrarImagen(imagen._id)} className="borrarimagen"><i className="fas fa-times-circle"></i></div>
                                              <div onClick={() => this.selectImage(imagen.file)} className="imageneslistas">
                                                   <img src={imagen.file} al={imagen._id} />
                                                   <span className="agregarimg"><i className="fas fa-plus"></i></span>
                                             </div>
                                           </div>
                                         ))
                                     }
                                 </div>
                             </div>
                        </div>
                    </div>
                </div>                    
                    </React.Fragment>
            )
        } else {
        return <p className="error">{this.state.error.msg}</p>
        }
    }
}
