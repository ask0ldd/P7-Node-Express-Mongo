const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


// REGISTER USER
exports.signup = (req, res, next) => {
    // return an error if the password doesn't match 8 <= length <= 24
    if (req.body.password.length < 8 || req.body.password.length > 24) return res.status(400).json({error : "Password should have at least 8 characters and no more than 24."})
    bcrypt.hash(req.body.password, 10) // 10 : number of hashing passes
    .then(hash => {
        const user = new User({
            email : req.body.email,
            password : hash
        })
        user.save().
        then(() => res.status(201).json({message : 'User created.'}))
        .catch(error => res.status(400).json({error}))
    }).catch(error => res.status(500).json({error}))
}

// LOG USER
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => 
        {
        if (!user) return res.status(401).json({ error : 'Password & login dont match.'})
        
        // compare the processed sent password with the hashed one in db
        bcrypt.compare(req.body.password, user.password)
        .then(valid => 
            {
            if (!valid) { return res.status(401).json({ error : 'Password & login dont match.' });}
            
            console.log("correct :", user._id)

            res.status(200).json({
                userId: user._id,
                // send back a jsonwebtoken
                token: jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '1h' })
            })
            }).catch(error => res.status(500).json({ error : "Encryption error." }))
        }).catch(error => res.status(500).json({ error : "Unknown user." }))
}
