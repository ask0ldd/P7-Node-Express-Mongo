const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    // _id automatiquement genere par mongo
    title: { type : String, required : true},
    description: { type : String, required : true},
    imageUrl: { type : String, required : true},
    userId: { type : String, required : true},
    price: { type : Number, required : true},

})

module.exports = mongoose.model('Book', bookSchema)