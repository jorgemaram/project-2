const express = require('express')
const router = express.Router()

const User = require('./../models/user.model')

// Endpoints
router.get('/users', (req, res) => {

    User
        .find()
        .then(response => res.json(response))
        .catch(err => next(err))
})

module.exports = router