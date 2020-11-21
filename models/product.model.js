const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: { type: Schema.Types.ObjectId, ref: 'User'},
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        default: "https://www.artconnect.com/assets/default/default_project_list-5f8dc5d6774d05041988544e0546b47e3f0f464c74f1ac84779334fabfc014a0.png"
    } 
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product

//date: {}