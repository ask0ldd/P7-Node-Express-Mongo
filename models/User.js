const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type : String, required : true, unique : [true, 'Email already used'], maxLength: [64, 'Email is too long'], validate: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email format.']}, // unique
    password: { type : String, required : true, minLength: 8, maxLength: 72} // longueur minimum (?=.*\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\W)|(?=.*_))^[^ ] / hash length 72 max
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema)