const express = require('express')
const router = express.Router()

const Product = require('../models/product.model')
const User = require('../models/user.model')

//Endpoints

//INDICE PRODUCTOS
router.get('/', (req, res) => {
    Product
        .find()
        .populate('user')
        .then(response => res.render('products/index-product', { response }))
        .catch(err => next(new Error(err)))
})

//NUEVO PRODUCTO
router.get('/new', (req, res, next) => {
    User
        .find()
        .then(response => {
            res.render('products/new-product', { response })
        })
        .catch(err => next(new Error(err)))
})
router.post('/new', (req, res, next) => {
    const { title, description, author, date, image } = req.body

    Product
        .create({ title, description, author, date, image })
        .then(() => res.redirect('/products'))
        .catch(err => next(new Error(err)))
})

//LISTA PRODUCTOS
router.get('/list', (req, res, next) => {
    Product
        .find()
        .then(response => {
            res.render('products/list-product', { response })
        })
        .catch(err => next(new Error(err)))
})

//EDITAR PRODUCTO
router.get('/edit', (req, res, next) => {
    const productId = req.query.id

    User
        .findById(productId)
        .then(response => res.render('products/edit-product', response))
        .catch(err => next(new Error(err)))
})

router.post('/edit', (req, res, next) => {
    const productId = req.query.id
    const { title, description, author, date, image } = req.body

    Product
        .findByIdAndUpdate(productId = { title, description, author, date, image })
        .then(() => res.redirect('/products'))
        .catch(err => next(new Error(err)))
})

//DETALLES PRODUCTOS
router.get('/details/:id', (req, res, next) => {
    const productId = req.params.id

    Product
        .findById(productId)
        .populate('user')
        .then(response => res.render('products/details-product', response))
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

