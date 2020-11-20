const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    birthday: Date,
    genre: String,
    location: {
        type: {
            type: String
        },
        coordinates: [Number]
    },
    image: String,
    description: String,
    hobbies: {
        type: String,
        enum: ['TO-DO']
    },
    personality: {
        type: String,
        enum: ['TO-DO']
    },
    languages: {
        type: String,
        enum: ['TO-DO']
    },
    job: {
        type: String,
        enum: ['TO-DO']
    },
    nickname: String,
    password: TO-DO,
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User