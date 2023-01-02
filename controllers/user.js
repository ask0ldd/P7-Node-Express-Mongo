const User = require('../models/User')
const bcrypt = require('bcrypt')

/*exports.postUser = (req, res, next) => { 
    const user = new User({...req.body})
    user.save()
          .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
          .catch(error => res.status(400).json({ error }));
}*/

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // 10 : number of hashing passes
    .then(hash => {
        const user = new User({
            email : req.body.email,
            password : hash
        })
        user.save().then(() => res.status(201).json({message : 'user created'})).catch(error => res.status(400).json({error}))
    }).catch(error => res.status(500).json({error}))
}

exports.login = (req, res, next) => {
    
}
