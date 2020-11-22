const express = require('express')
const router = express.Router()

const User = require('../models/user.model')
const Product = require('../models/product.model')

const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, inicia sesión' })

//Endpoints
//PERFIL USUARIO
router.get('/', ensureAuthenticated, (req, res) => { res.render('users/index-profile', { user: req.user }) })
    Product
        .find()       
        .then(allProducts => res.render("users/index-profile", { allProducts }))
        .catch(err => console.log("Error:", err))   


//LISTA PERFILES
router.get('/list', (req, res, next) => {
    User
        .find()
        .then(response => {
            res.render('users/list-profile', { response })
        })
        .catch(err => next(new Error(err)))
})

//EDITAR PERFIL
router.get('/edit', (req, res, next) => {
    const userId = req.query.id

    User
        .findById(userId)
        .then(response => res.render('users/edit-profile', response))
        .catch(err => next(new Error(err)))
})

router.post('/edit', (req, res, next) => {
    
    const userId = req.query.id
    const { name, birthday, gender, latitude, longitude, image, description, skills, personality, languages, experiences, username, password } = req.body

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }
    if (name === "" || birthday === "" || genre === "" || latitude === "" || username === "" || password === "") {
        res.render('users/edit-profile', { errorMsg: "Rellena todos los campos" })
        return
    }
    else {
        User
            .findByIdAndUpdate(userId, { name, birthday, gender, location, image, description, skills, personality, languages, experiences, username, password })
            .then(() => res.redirect('/user'), { errorSuccess: "Datos modificados correctamente" })
            .catch(err => next(new Error(err)))
    }
})

router.get('/details/:id', (req, res, next) => {
    const userId = req.params.id

    User
        .findById(userId)
        .then(response => res.render('users/details-profile', response))
        .catch(err => next(new Error(err)))
})

router.get('/delete', (req, res, next) => {
    const userId = req.query.id
    User
        .findByIdAndRemove(userId)
        .then(() => res.redirect('/'))
        .catch(err => next(new Error(err)))
})

// //router.get('/contact') => ('users/details-profile')

module.exports = router