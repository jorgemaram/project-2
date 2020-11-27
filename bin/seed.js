const mongoose = require('mongoose')
const User = require('../models/user.model')
const Product = require('../models/product.model')

const dbtitle = 'CodeLance'
mongoose.connect(`mongodb://localhost/${dbtitle}`, { useUnifiedTopology: true, useNewUrlParser: true })

User.collection.drop()
Product.collection.drop()

const products = [
    {
        title: "Tech project",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        author: {
            "name": "Suzanne",
            "birthday": new Date(1962, 07, 11),
            "gender": "Femenino",
            "location": [40.400586, -3.690467],
            "image": "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "description": "Lorem ipsum",
            "skills": "JavaScript",
            "personality": "Flexible",
            "languages": "Inglés",
            "experiences": "full-stack developer",
            "username": "prueba1",
        },
        date: new Date(2020, 07, 11),
        image: "https://ae01.alicdn.com/kf/Hdbfcaa0685254bb09049894daf868111u/Multi-function-Universal-Smart-Adaptor-Card-Storage-Data-Cable-USB-Box-Wireless-Charging-For-iphone-For.jpg"
    },
    {
        title: "Ux/Ui project",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        author: {
            "name": "Suzanne",
            "birthday": new Date(1962, 07, 11),
            "gender": "Femenino",
            "location": [40.400586, -3.690467],
            "image": "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "description": "Lorem ipsum",
            "skills": "JavaScript",
            "personality": "Flexible",
            "languages": "Inglés",
            "experiences": "full-stack developer",
            "username": "prueba12",
        },
        date: new Date(2020, 07, 11),
        image: "https://ae01.alicdn.com/kf/Hdbfcaa0685254bb09049894daf868111u/Multi-function-Universal-Smart-Adaptor-Card-Storage-Data-Cable-USB-Box-Wireless-Charging-For-iphone-For.jpg"
    },
   {
        title: "Data project",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        author: {
            "name": "Suzanne",
            "birthday": new Date(1962, 07, 11),
            "gender": "Femenino",
            "location": [40.400586, -3.690467],
            "image": "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "description": "Lorem ipsum",
            "skills": "JavaScript",
            "personality": "Flexible",
            "languages": "Inglés",
            "experiences": "full-stack developer",
            "username": "prueba13",
        },
        date: new Date(2020, 07, 11),
        image: "https://ae01.alicdn.com/kf/Hdbfcaa0685254bb09049894daf868111u/Multi-function-Universal-Smart-Adaptor-Card-Storage-Data-Cable-USB-Box-Wireless-Charging-For-iphone-For.jpg"
    },
]


Promise.all(products.map(product => User.create(product.author).then(author => author.name)))
    .then(() => products.map(product => User.findOne({ name: product.author.name }).then(author => Object.assign({}, product, { author: author._id }))))
    .then(findAuthors => Promise.all(findAuthors).then(products => products.map(product => Product.create(product))))
    .then(savedProducts => Promise.all(savedProducts).then(products => products.forEach(product => console.log(`Proyecto ${product.title} creado`))).then(() => mongoose.connection.close()))
    .catch(error => console.log('Error: ', error))

