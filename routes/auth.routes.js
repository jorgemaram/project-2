const express = require('express');
const router = express.Router();

const passport = require("passport")
const User = require("../models/user.model")

const bcrypt = require("bcryptjs")
const bcryptSalt = 10

// const ensureLogin = require('connect-ensure-login');

// const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, inicia sesión' })


router.get('/registro', (req, res) => { res.render('auth/signup') })

router.post('/registro', (req, res, next) => {
    
    const { name, birthday, gender, latitude, longitude, username, password } = req.body

        const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    if (name === '' || birthday === '' || gender === '' || username === '' || password === '') {
        res.render("auth/signup", { errorMsg: "Rellena todos los campos" })
        return
    }

    if (!password.match(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)) {
        res.render('auth/signup', { errorMsg: 'La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, una minúscula y una mayúscula.' })
        return
    }

    if (!username.match(/^([a-zA-Z0-9]+){2,15}$/)) {
        res.render('auth/signup', { errorMsg: 'El nombre de usuario debe tener entre 2 y 15 caracteres y sólo puede incluir letras o números' })
        return
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
                .create({ name, birthday, gender, location, username, password: hashPass })
                .then(() => res.redirect('/'))
                .catch((err) => console.log("Error:", err))
        })
        .catch(err => next(new Error(err)))
})

router.get('/inicio-sesion', (req, res) => {
    res.render('auth/login', { errorMsg: req.flash("error") })
})

router.post('/inicio-sesion', passport.authenticate("local", {
    successRedirect: "/user",
    failureRedirect: "/auth/inicio-sesion",
    failureFlash: true,
    passReqToCallback: true
}))

router.get('/cerrar-sesion', (req, res) => {
    req.logout()
    res.redirect("/auth/inicio-sesion")
})

module.exports = router;