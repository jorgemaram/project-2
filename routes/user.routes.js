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
//FUNCIONA
//router.get('/', ensureAuthenticated, (req, res, next) => { res.render('users/index-profile', { user: req.user }) })

//// me saca los productos por consola ordenando segun el autor 
//  router.get('/', ensureAuthenticated, (req, res, next) => {
//      const userId = req.user.id

//     User
//         .findById(userId)
//         .then(() => {
//             function userProduct(elm) {
//                 return elm.author = userId
//             }
//             Product
//                 .find({}, { author: 1 })
//                 .then((allProducts) => {
//                     console.log(allProducts)
//                     res.render('users/index-profile', { user: req.user })
//                 })
//                 .catch(err => next(new Error(err)))

//         })
// })


router.get('/', ensureAuthenticated, (req, res, next) => {
    const id = req.user.id
    const object = mongoose.Types.ObjectId(id)

    const userPromise = User.findById(id)
    const productPromise = Product.find({author:object})

    Promise
        .all([userPromise, productPromise])
        .then(results => {
            console.log(results)
            res.render('users/index-profile', { user: results[0], products: results[1] })
        })
        .catch(err => next(new Error(err)))
})

//// me saca los productos por consola con el autor cambiandole el ID, 

// router.get('/', ensureAuthenticated, (req, res, next) => {
//     const userId = req.user.id
//     User
//         .findById(userId)
//         .then(() => {
//             Product
//                 .find()
//                 .then(() => { //filtro == req.user.id
//                     console.log(userId)
//                     Product
//                         .find()
//                         .then((allProducts) => {
//                             function userProduct(elm) {
//                                 return elm.author = userId 
//                             }
//                             const userProducts = allProducts.filter(userProduct)
//                             console.log(userProducts)
//                         })
//                         .catch(err => next(new Error(err)))
//                     //let userProducts = allProducts.filter(userId)
//                     //         console.log(allProducts) // me saca todos los productos por consola, 
//                 })
//         })
//     // })
//     //.catch(err => next(new Error(err)))

// })

// router.get('/', ensureAuthenticated, (req, res, next) => {
//     User
//         .find()
//         .then(thisUser => {
//               thisUser : req.user 
//         })
//         .then(() => {
//             return User
//             Product
//                 .find()
//                 console.log(Product)
//                 .then(res.render('users/index-profile'))
//         })
//         .catch(err => next(new Error(err)))
// })

// router.get('/', ensureAuthenticated, (req, res, next) => {
//     User
//         .find()
//         .then(() => {
//             if ({ user: req.user } )
//                 return

//             Product
//                 .find()
//                 .then(allProducts => {
//                     res.render('users/index-profile', { allProducts })
//                 })
//                 .catch(err => next(new Error(err)))
//         })
// })


// router.get('/', ensureAuthenticated, (req, res, next) => {
//     const userPromise = req.user
//     const productPromise = Product.find()

//     Promise.all([userPromise, productPromise])
//         .then(() => {
//             console.log(productPromise)
//             res.render('users/index-profile', { user: userPromise })
//         })
//         .catch(err => next(new Error(err)))
// })


// router.get('/', (req, res) => {
//     Product
//         .find()
//         .then(allProducts => {
//             res.render('users/index-profile', { allProducts })
//         })
//         .catch(err => console.log("Error:", err))
//  })


//LISTA PERFILES
router.get('/lista', ensureAuthenticated, (req, res, next) => {
    User
        .find()
        .then(allUsers => {
            res.render('users/lists-profile', { allUsers })
        })
        .catch(err => next(new Error(err)))
})

//EDITAR PERFIL
router.get('/editar', ensureAuthenticated, (req, res, next) => {
    const userId = req.query.id

    User
        .findById(userId)
        .then(thisUser => res.render('users/edit-profile', thisUser))
        .catch(err => next(new Error(err)))
})

router.post('/editar', CDNupload.single('imageFile'), (req, res, next) => {

    const userId = req.query.id
    const { name, birthday, gender, latitude, longitude, image, description, skills, personality, languages, experiences, username, password } = req.body

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    // if (name === "" || birthday === "" || gender === "" || username === "" || password === "") {
    //     res.render('users/edit-profile', { errorMsg: "Rellena todos los campos" })
    //     return
    // }
    // else {
        User
            .findByIdAndUpdate(userId, { name, birthday, gender, image, description, skills, personality, languages, experiences, username, password })
            .then(() => res.redirect('/usuario'), { successMsg: "Datos modificados correctamente" })
            .catch(err => next(new Error(err)))
    // }
})


router.get('/eliminar', (req, res, next) => {
    const userId = req.query.id
    User
        .findByIdAndRemove(userId)
        .then(() => res.redirect('/'))
        .catch(err => next(new Error(err)))
})

// CONTACT
// router.post('/', (req, res) => {

//     const { email, subject, message } = req.body

//     transporter
//         .sendMail({
//             from: '"Match Designers" <myawesome@project.com>',
//             to: email,
//             subject,
//             text: message,
//             html: `<b>${message}</b>`
//         })            
//         .then(() => res.render("users/index-profile", { successMsg: 'Correo enviado !' }))
//         .catch(error => console.log(error))
// })

// GET USERS FOR SEARCHBAR
router.get('/lista', (req, res) => {

    User
        .find()
        .then(users => res.json(users))
        .catch(err => next(err))
})

router.get('/detalles/:id', ensureAuthenticated, (req, res, next) => {
    const userId = req.params.id

    User
        .findById(userId)
        .then(user => res.render('users/details-profile', { user: req.user }))
        .catch(err => next(new Error(err)))
})

module.exports = router