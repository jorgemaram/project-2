const express = require('express')
const router = express.Router()
const CDNupload = require('./../configs/cdn-upload.config')

const User = require('../models/user.model')
const Product = require('../models/product.model')

const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, inicia sesión' })

//Endpoints
//PERFIL USUARIO
router.get('/', ensureAuthenticated, (req, res) => { res.render('users/index-profile', { user: req.user }) })


//LISTA PERFILES
router.get('/list', ensureAuthenticated, (req, res, next) => {
    User
        .find()
        .then(user => {
            res.render('users/lists-profile', { user: req.user })
        })
        .catch(err => next(new Error(err)))
})

//EDITAR PERFIL
router.get('/edit', ensureAuthenticated, (req, res, next) => {
    const userId = req.query.id

    User
        .findById(userId)
        .then(thisUser => res.render('users/edit-profile', thisUser))
        .catch(err => next(new Error(err)))
})

router.post('/edit', CDNupload.single('imageFile'), (req, res, next) => {
    
    const userId = req.query.id
    const { name, birthday, gender, latitude, longitude, image, description, skills, personality, languages, experiences, username, password } = req.body

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }
    
    if (name === "" || birthday === "" || gender === "" || username === "" || password === "") {
        res.render('users/edit-profile', { errorMsg: "Rellena todos los campos" })
        return
    }
    else {
        User
            .findByIdAndUpdate(userId, { name, birthday, gender, image, description, skills, personality, languages, experiences, username, password })
            .then(() => res.redirect('/'), { successMsg: "Datos modificados correctamente" })
            .catch(err => next(new Error(err)))
    }
})


router.get('/delete', (req, res, next) => {
    const userId = req.query.id
    User
    .findByIdAndRemove(userId)
    .then(() => res.redirect('/'))
    .catch(err => next(new Error(err)))
})

// //router.get('/contact') => ('users/details-profile')

router.get('/details/:id', ensureAuthenticated, (req, res, next) => {
    const userId = req.params.id

    User
        .findById(userId)
        .then(user => res.render('users/details-profile', { user: req.user }))
        .catch(err => next(new Error(err)))
})

module.exports = router