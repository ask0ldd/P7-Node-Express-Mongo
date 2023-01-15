const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type : String, required : true, unique : true, validate: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email format.']}, // unique !!!!
    password: { type : String, required : true} // longueur minimum (?=.*\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\W)|(?=.*_))^[^ ]
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema)