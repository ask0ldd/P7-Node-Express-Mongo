const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => { // Verify password not too short or too long > error
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

exports.login = (req, res, next) => {
    console.log("login")
    console.log(req.body.email)
    User.findOne({ email: req.body.email })
    .then(user => 
        {
        if (!user) return res.status(401).json({ message: 'Password and login dont match.'})

        //console.log(req.body.password, user.password)
        
        bcrypt.compare(req.body.password, user.password)
        .then(valid => 
            {
            if (!valid) {console.log("incorrect"); return res.status(401).json({ message: 'Password and login dont match.' });}
            
            console.log("correct :", user._id)

            res.status(200).json({
                userId: user._id,
                token: jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' })
            })
            }).catch(error => res.status(500).json({ error : "Encryption error." }))
        }).catch(error => res.status(500).json({ error : "Can't log." }))
}
