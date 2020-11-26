const express = require('express')
const router = express.Router()
const transporter = require('../configs/nodemailer.config')

router.get('/', (req, res) => {
    res.render('contact')
})

router.post('/', (req, res) => {

    const { email, subject, message } = req.body

    transporter
        .sendMail({
            from: '"Match Designers"',
            to: email,
            subject,
            text: message,
            html: `<b>${message}</b>`
        })
        .then(() => res.render("contact", { successMsg: 'Correo enviado !' }))
        .catch(error => console.log(error))
})

module.exports = router