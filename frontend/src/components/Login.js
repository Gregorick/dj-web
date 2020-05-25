import React, { Component } from 'react'
import { login } from './userFunctions'
import axios from 'axios'

export default class Login extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            users: [],
            emails: [],
            error: false
        }
    }

    async componentDidMount() {
       const res = await axios.get('https://dj-node.herokuapp.com/users/usuarios')
       this.setState({
           users: res.data,
       })
       const emails = Array.isArray(this.state.users) && this.state.users.map(user => user.email)
       this.setState({
           emails: emails
       })
    }

    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
        if (  Array.isArray(this.state.emails) && this.state.emails.includes(e.target.value) ) {
            this.setState({
                error: true
            })
        }
    }

     handleSubmit = e => {
         e.preventDefault()
         const loginuser = {
             email: this.state.email,
             password: this.state.password
         }
         const error = {}
         const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
         error.email = !loginuser.email.match(emailformat) ? alert("Email Ivalido") : ""
         error.emaildos = this.state.error === false  ? alert("Correo no alido") : ""
         error.passworduno = loginuser.password.length > 20 ? alert("Contraseña debe de tener menos de 20 carácteres") : ""
         error.passworddos = loginuser.password.length === 0 ? alert("La contraseña no puede estar vacia") : ""
         console.log(error)
         if (error.email === "" && error.emaildos === "" && error.passworduno === "" && error.passworddos === "" ) {
            login(loginuser).then(res => {
                if (res) {
                    this.props.history.push('/select')
                }
            })
         }
     }

    
    render() {
        return (
            <div className="registrate">
                <div className="titulo"><h3>Iniciar Sección</h3></div>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} name='email' placeholder="Correo Electrónico..." type="text"/>
                    <input onChange={this.handleChange} name='password' placeholder="Contraseña..." type="password" required/>
                    <input type="submit" className="btninput" value="Iniciar sección" />
                </form>
            </div>   
        )
    }
}
