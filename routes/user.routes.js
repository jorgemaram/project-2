const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const CDNupload = require('./../configs/cdn-upload.config')
const transporter = require('../configs/nodemailer.config')

const User = require('../models/user.model')
const Product = require('../models/product.model')

const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Debes iniciar sesión' })

//Endpoints

//PERFIL USUARIO

router.get('/', ensureAuthenticated, (req, res, next) => {
    const id = req.user.id
    const object = mongoose.Types.ObjectId(id)
    const userPromise = User.findById(id)
    const productPromise = Product.find({ author: object })

    Promise
        .all([userPromise, productPromise])
        .then(results => {
            res.render('users/index-profile', { user: results[0], products: results[1] })
        })
        .catch(err => next(new Error(err)))
})

//LISTA PERFILES

router.get('/lista', ensureAuthenticated, (req, res, next) => {

    User
        .find()
        .then(allUsers => {
            res.render('users/lists-profile', { allUsers })
        })
        .catch(err => next(new Error(err)))
})

//EDITAR PERFIL (GET)

router.get('/editar', ensureAuthenticated, (req, res, next) => {
    const userId = req.query.id

    User
        .findById(userId)
        .then(thisUser => res.render('users/edit-profile', thisUser))
        .catch(err => next(new Error(err)))
})

//EDITAR PERFIL (POST)

router.post('/editar', CDNupload.single('imageFile'), (req, res, next) => {
    const userId = req.query.id
    const { name, birthday, gender, latitude, longitude, description, skills, personality, languages, experiences, username, password } = req.body
    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }
    const image = req.file.path
    const userPromise = User.findByIdAndUpdate(userId, { name, birthday, gender, description, image, skills, personality, location, languages, experiences, username, password })
    if (name === "" || birthday === "" || username === "" || password === "") {
        res.render('users/edit-profile', { errorMsg: "Rellena todos los campos" })
        return
    }
    else {

    Promise
        .all([image, userPromise])
        .then(() => res.redirect('/usuario'))
        .then(() => console.log(image))
        .catch(err => next(new Error(err)))
    }
})    


router.get('/eliminar', (req, res, next) => {
    const userId = req.query.id

    User
        .findByIdAndRemove(userId)
        .then(() => res.redirect('/'))
        .catch(err => next(new Error(err)))
})

// USUARIOS PARA BARRA DE BÚSQUEDA

router.get('/lista', (req, res) => {

    User
        .find()
        .then(users => res.json(users))
        .catch(err => next(err))
})

// DETALLES DE USUARIO ENCONTRADO A RAÍZ DE BARRA DE BÚSQUEDA

router.get('/detalles/:id', ensureAuthenticated, (req, res, next) => {
    const userId = req.params.id
    const object = mongoose.Types.ObjectId(userId)
    const userPromise = User.findById(userId)
    const productPromise = Product.find({ author: object })
    Promise
        .all([userPromise, productPromise])
        .then(results => {
            res.render('users/details-profile', { user: results[0], products: results[1] })
        })
        .catch(err => next(new Error(err)))
})

module.exports = router
