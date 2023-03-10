const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type : String, trim : true, required : true, unique : [true, 'Email already used'], maxLength: [64, 'Email is too long'], validate: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email format.']}, // unique
    password: { type : String, required : true, minLength: 8, maxLength: 72} // hash length 72 chars max
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema)