import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import logoDJ from '../img/djlogo.jpg'
import { Link, withRouter } from 'react-router-dom'

 class Header extends Component {

    logout = e => {
        e.preventDefault()
        localStorage.removeItem('usertoken');
        this.props.history.push('/')
    }

    async componentDidMount() {
//    this.preguntar()
}

preguntar = () => {
    const bPreguntar = true;
    window.onbeforeunload = preguntarAntesDeSalir;
    function preguntarAntesDeSalir() {
if (bPreguntar) {
    localStorage.removeItem('usertoken'); 
}
}
}

    render() {

        const userLink = (
           <ul>
               <li><Link to={'/create'}>Agregar Canción</Link></li>
               <li><Link to={'/select'}>Seleccionar Canción</Link></li>
               <li><Link to={'/lista'}>Lista</Link></li>
               <li><a href="" onClick={this.logout}>Salir</a></li>               
           </ul>
        )

        const loginReglink = (
            <ul>
               <li><Link to={'/register'}>Registrase</Link></li>
               <li><Link to={'/login'}>Logearse</Link></li>
            </ul>
        )

        return (
           <div className="navegacion">
               
               <div className="logo">
                   <div className="titulo"><h3>Dj Music</h3></div>
                   <img src={logoDJ} alt="logo"/>
               </div>
               <nav>
                   {localStorage.usertoken ? userLink : loginReglink}
               </nav>
           </div> 
        )
    }
}

export default withRouter(Header)