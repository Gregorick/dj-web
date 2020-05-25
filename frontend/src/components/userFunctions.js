import axios from 'axios'

export const register = newUser => {
    return axios
    .post('https://dj-node.herokuapp.com/users/register', {
        nombre: newUser.nombre,
        apellido: newUser.apellido,
        email: newUser.email,
        password: newUser.password
    })
    .then(res => {
        console.log('Registrado')
    })
}

export const login = user => {
    return axios
    .post('https://dj-node.herokuapp.com/users/login', {
        email: user.email,
        password: user.password
    })
    .then(res => {
        localStorage.setItem('usertoken', res.data)
        return res.data
    })
    .catch( err => {
        console.log(err)
    })
}