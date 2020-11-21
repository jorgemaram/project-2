const express = require('express')
const router = express.Router()

const User = require('../models/user.model')

//Endpoints
//PERFIL USUARIO
router.get('/', (req, res) => { res.render('users/index-profile') })

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
    const { name, birthday, genre, latitude, longitude, image, description, hobbies, personality, languages, job, nickname, password } = req.body

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }
    if (name === "" || birthday === "" || genre === "" || latitude === "" || description === "" || image === "" || nickname === "" || password === "") {
        res.render('users/edit-profile', { errorMsg: "Fill the gaps" })
        return
    }
    else {
        User
            .findByIdAndUpdate(userId = { name, birthday, genre, location, image, description, hobbies, personality, languages, job, nickname, password })
            .then(() => res.redirect('/user'))
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