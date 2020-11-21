const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    title: String,
    description: String,
    author: { type: Schema.Types.ObjectId, ref: 'User'},
    date: Date,
    image: String 
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product

//date: {type: Date, default: Date.now}