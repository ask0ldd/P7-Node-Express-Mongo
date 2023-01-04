const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    // _id automatiquement genere par mongo
    title: { type : String, required : true},
    author: { type : String, required : true},
    imageUrl: { type : String, required : true},
    year: { type : Number, required : true},
    genre: { type : String, required : true},
    ratings:    [{
                    _id : false,
                    userId: {type : String},
                    grade: {type : Number}
                }],
    averageRating: { type : Number }
})

module.exports = mongoose.model('Book', bookSchema)