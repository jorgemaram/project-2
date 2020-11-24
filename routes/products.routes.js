const express = require('express')
const router = express.Router()
const CDNupload = require('./../configs/cdn-upload.config')

const Product = require('../models/product.model')
const User = require('../models/user.model')


const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, inicia sesión' })

//Endpoints

//NUEVO PRODUCTO

router.get('/new', ensureAuthenticated, (req, res, next) => {
    User
        .find()
        .then(user => {
            res.render('products/new-product', { user: req.user })
        })
        .catch(err => next(new Error(err)))
})
router.post('/new', CDNupload.single('imageFile'), (req, res, next) => {
    const { title, description, date, image } = req.body
    const author = req.user

    Product
        .create({ title, description, author, date, image })
        .then(() => res.redirect('/user'))
        .catch(err => next(new Error(err)))
})

//EDITAR PRODUCTO
router.get('/edit', ensureAuthenticated, (req, res, next) => {
    const productId = req.query.id

    User
        .findById(productId)
        .then(user => res.render('products/edit-product', { user: req.user }))
        .catch(err => next(new Error(err)))
})

router.post('/edit', CDNupload.single('imageFile'), (req, res, next) => {
    const productId = req.query.id
    const { title, description, author, date, image } = req.body

    Product
        .findByIdAndUpdate(productId = { title, description, author, date, image })
        .then(() => res.redirect('/products'))
        .catch(err => next(new Error(err)))
})

//DETALLES PRODUCTOS
router.get('/details/:id', ensureAuthenticated, (req, res, next) => {
    const productId = req.params.id

    Product
        .findById(productId)
        .populate('user')
        .then(user => res.render('products/details-product', { user: req.user }))
        .catch(err => next(new Error(err)))
})

router.get('/delete', (req, res, next) => {
    const productId = req.query.id
    User
        .findByIdAndRemove(productId)
        .then(() => res.redirect('/products'))
        .catch(err => next(new Error(err)))
})

// router.get('/contact') => ('products/message-product')
// router.post('/contact') => ('products/list-product')

module.exports = router

