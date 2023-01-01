const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator'); // unique

const userSchema = mongoose.Schema({
    // _id automatiquement genere par mongo
    email: { type : String, required : true, unique : true}, // unique
    password: { type : String, required : true}
})

userSchema.plugin(uniqueValidator); // unique

module.exports = mongoose.model('User', userSchema)