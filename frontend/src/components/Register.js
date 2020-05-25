import React, { Component } from 'react'
import { register } from './userFunctions'
import axios from 'axios'



export default class Register extends Component {

    constructor() {
        super()
        this.state = {
            nombre: '',
            apellido: '',
            email: '',
            password: '',
            emailcorrecto: '',
            users: [],
            emails: [],
            errors: false
        }
    }

    async componentDidMount() {
        const res = await axios.get('https://dj-node.herokuapp.com/users/usuarios')
        this.setState({
            users: res.data,
        })
        const memails = Array.isArray(this.state.users) && this.state.users.map(user => user.email)
        this.setState({
            emails : memails
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
        if ( Array.isArray(this.state.emails) && this.state.emails.includes(e.target.value) ) {
            this.setState({
                errors: true
            })
        } 
    }
    

     handleSubmit = async e => {
        e.preventDefault()
        const user = {
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            email: this.state.email,
            password: this.state.password
        }
        const error = {}
        const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        error.emaildos = this.state.errors === false ? "" : alert("Correo Existe")
        error.email = !user.email.match(emailformat) ? alert("Email Inválido") : ""
        error.password = user.password.length === 0 ? alert("contraseña no debe de estar vacia") : ""
        error.passworddos = user.password.length < 8 ? alert("La contraseña debe tener un mínimo de 8 Carácteres") : ""
        error.passwordtres = user.password.length > 20 ? alert("La contraseña es muy larga") : ""
        if ( error.email === '' && error.emaildos === "" &&  error.password === "" && error.passworddos === "" && error.passwordtres === "") {
            register(user).then(res => {
                this.props.history.push('/login')
               })
        }

    }

    render() {
        return (
            <div className="registrate">
                <div className="titulo"><h3>Regístrate</h3></div>
                <form onSubmit={this.handleSubmit}>
                    <input  onChange={this.handleChange} name='nombre' placeholder="Nombre..." type="text" required/>
                    <input  onChange={this.handleChange} name='apellido' placeholder="Apellido..." type="text" required/>
                    <input  onChange={this.handleChange} name='email' placeholder="Correo Electrónico..." type="text" required/>
                    <input  onChange={this.handleChange} name='password' placeholder="Contraseña..." type="password" required/>
                    <input type="submit" className="btninput" value="Registrar" />
                </form>
            </div>   
        )
    }
}
