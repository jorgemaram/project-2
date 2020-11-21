const express = require('express');
const router = express.Router();

const passport = require("passport")
const User = require("../models/user.model")

const bcrypt = require("bcryptjs")
const bcryptSalt = 10

const ensureLogin = require('connect-ensure-login');

const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, inicia sesión' })

router.get('/user', ensureAuthenticated, (req, res) => res.render('users/index-profile', { user: req.user }))
router.get('/user/list', ensureAuthenticated, (req, res) => res.render('users/list-profile', { user: req.user }))
router.get('/user/edit', ensureAuthenticated, (req, res) => res.render('users/edit-profile', { user: req.user }))
router.get('/user/details', ensureAuthenticated, (req, res) => res.render('users/details-profile', { user: req.user }))
router.get('/user/delete', ensureAuthenticated, (req, res) => res.render('index', { user: req.user }))
router.get('/products', ensureAuthenticated, (req, res) => res.render('products/index-product', { user: req.user }))
router.get('/products/new', ensureAuthenticated, (req, res) => res.render('products/new-product', { user: req.user }))
router.get('/products/list', ensureAuthenticated, (req, res) => res.render('products/list-product', { user: req.user }))
router.get('/products/edit', ensureAuthenticated, (req, res) => res.render('products/edit-product', { user: req.user }))
router.get('/products/details', ensureAuthenticated, (req, res) => res.render('products/details-product', { user: req.user }))
router.get('/products/delete', ensureAuthenticated, (req, res) => res.render('products/index-product', { user: req.user }))

router.get('/signup', (req, res) => { res.render('auth/signup.hbs') })

router.post('/signup', (req, res, next) => {
    const { username, password } = req.body

    if (username === '' || password === '') {
        res.render("auth/signup", { errorMsg: "Rellena todos los campos" })
    }
    User
        .findOne({ username })
        .then(user => {
            if (user) {
                res.render("auth/signup", { errorMsg: "El usuario ya existe" })
                return
            }
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ username, password: hashPass })
                .then(() => res.redirect('/'))
                .catch(() => res.render("auth/signup", { errorMsg: "Hubo un error" }))
        })
        .catch(err => next(new Error(err)))
})

router.get('/login', (req, res) => {
    res.render('auth/login', { errorMsg: req.flash("error") })
})

router.post('/login', passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
}))

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect("/")
})

module.exports = router;