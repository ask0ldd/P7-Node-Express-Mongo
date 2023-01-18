const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    userId: { type : String, required : [true, 'UserId is missing'], validate: [/^[a-z0-9]{5,40}$/, 'Invalid user id']},
    title: { type : String, trim : true, required : [true, 'Title is missing'], validate: [/^[a-zéèêëâàäûüùôçA-Z0-9 ,.'-]{2,24}$/, 'Invalid title']},
    author: { type : String, trim : true, required : [true, 'Author is missing'], validate: [/^[a-zéèêëâàäûüùôçA-Z0-9 ,.'-]{4,24}$/, 'Invalid author']},
    imageUrl: { type : String, required : true},
    year: { type : Number, trim : true, required : [true, 'Year of publication is missing'], validate: [/^[0-9]{3,4}$/, 'Invalid year']},
    genre: { type : String, trim : true, required : [true, 'Genre is missing'], validate: [/^[a-zéèêëâàäûüùôçA-Z0-9 ,.'-]{4,24}$/, 'Invalid genre']},
    ratings:    [{
                    _id : false,
                    userId: {type : String, required : [true, 'UserId is missing'], validate: [/^[a-z0-9]{5,40}$/, 'Invalid user id']},
                    grade: {type : Number, required : true, min: [0, 'Invalid number'], max: [5, 'Invalid number']}
                }],
    averageRating: { type : Number, required : [true, 'Average rating is missing'], min: [0, 'Invalid number'], max: [5, 'Invalid number'] }
})

// virtuals activation : _id > id duplication
bookSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Book', bookSchema)