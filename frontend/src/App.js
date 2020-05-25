import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Lista from './components/Lista'
import Register from './components/Register'
import Login from './components/Login'
import CreateLista from './components/CreateLista'
import SelectLista from './components/SelectLista'
import './css/estilos.css'

export default class App extends Component {
  render() {
    return (
       <Router>
         <div className="contenedor-full">
            <div className="flexbox">
              <Header />
              <div className="contenedor">
               <Switch>
               <Route exact path='/lista' component={Lista} />
               <Route exact path='/register' component={Register} />
               <Route exact path='/' component={Login} />
               <Route exact path='/login' component={Login} />
               <Route exact path='/create' component={CreateLista} />
               <Route exact path='/select' component={SelectLista} />
                 </Switch>
              </div>
            </div>
         </div>
         </Router>
    )
  }
}
