const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    userId: { type : String, required : [true, 'UserId is missing']}, // , validate: /^[a-z0-9]/ trim:true?!!! max 5 - 40
    title: { type : String, required : [true, 'Title is missing'], minLength: [2, 'Title is too short'], maxLength: [24, 'Title is too long']},
    author: { type : String, required : [true, 'Author is missing'], minLength: [4, 'Name is too short'], maxLength: [24, 'Name is too long']},
    imageUrl: { type : String, required : true},
    year: { type : Number, required : [true, 'Year of publication is missing'], validate: [/^[0-9]{3,4}$/, 'Invalid Year']},
    genre: { type : String, required : [true, 'Genre is missing'], minLength: [4, 'Genre is too short'], maxLength: [24, 'Genre is too long']},
    ratings:    [{
                    _id : false,
                    userId: {type : String, required : true},
                    grade: {type : Number, required : true, min: [1, 'Invalid Number'], max: [5, 'Invalid Number']}
                }],
    averageRating: { type : Number }
})

bookSchema.set('toJSON', { // <<<< Virtuals
    virtuals: true
})

module.exports = mongoose.model('Book', bookSchema)