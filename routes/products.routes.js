const express = require('express')
const router = express.Router()
const CDNupload = require('./../configs/cdn-upload.config')

const Product = require('../models/product.model')
const User = require('../models/user.model')


const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, inicia sesión' })

//Endpoints

//NUEVO PRODUCTO (GET)

router.get('/nuevo', ensureAuthenticated, (req, res, next) => {res.render('products/new-product', { user: req.user })})

//NUEVO PRODUCTO (POST)

router.post('/nuevo', CDNupload.single('imageFile'), (req, res, next) => {
    const { title, description, date, image } = req.body
    const author = req.user

    Product
        .create({ title, description, author, date, image })
        .then(() => res.redirect('/usuario'))
        .catch(err => next(new Error(err)))
})

//EDITAR PRODUCTO (GET)

router.get('/editar', ensureAuthenticated, (req, res, next) => {
    const productId = req.query.id

    Product
        .findById(productId)
        .then(thisProduct => res.render('products/edit-product', thisProduct))
        .catch(err => next(new Error(err)))
})

//EDITAR PRODUCTO (POST)

router.post('/editar', CDNupload.single('imageFile'), (req, res, next) => {
    const productId = req.query.id
    const { title, description, date, image } = req.body

    Product
        .findByIdAndUpdate(productId, { title, description, date, image })
        .then(() => res.redirect('/productos'), { successMsg: "Datos modificados correctamente" })
        .catch(err => next(new Error(err)))
})


//DETALLES PRODUCTO

router.get('/detalles/:id', ensureAuthenticated, (req, res, next) => {
    const productId = req.params.id

    Product
        .findById(productId)   
        .then(thisProduct => res.render('products/info-product', thisProduct))
        .catch(err => next(new Error(err)))
})

//BORRAR PRODUCTO

router.get('/eliminar', (req, res, next) => {
    const productId = req.query.id
    User
        .findByIdAndRemove(productId)
        .then(() => res.redirect('/productos'))
        .catch(err => next(new Error(err)))
})

// router.get('/contact') => ('products/message-product')
// router.post('/contact') => ('products/list-product')

module.exports = router

