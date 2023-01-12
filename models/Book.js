const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    userId: { type : String, required : true},
    title: { type : String, required : true},
    author: { type : String, required : true},
    imageUrl: { type : String}, //required
    year: { type : Number, required : true},
    genre: { type : String, required : true},
    ratings:    [{
                    _id : false,
                    userId: {type : String},
                    grade: {type : Number}
                }],
    averageRating: { type : Number }
})

bookSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Book', bookSchema)