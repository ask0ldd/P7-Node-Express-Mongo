const express = require('express')
const mongoose = require('mongoose')
const mdp = require('./mdp')

const bookRoutes = require('./routes/book')
const userRoutes = require('./routes/user')
const path = require('path') // ???!!!

// todo : connexion db
mongoose.connect(mdp,
  { useNewUrlParser: true,
    useUnifiedTopology: true }) // ??!!!!
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

const app = express()

app.use('/images', express.static(path.join(__dirname, 'images'))) // accepting requests asking for an image

app.use(express.json({limit: '2mb'})) // extract json from request body // fixe limit

app.use((req, res, next) => { 
    res.setHeader('Access-Control-Allow-Origin', '*') // deals with CORS
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, X-Auth-Token')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE') // out : PATCH, OPTIONS
    next()
})

app.use('/api/books', bookRoutes)
app.use('/api/auth', userRoutes)

// give access to the app to other files through require
module.exports = app  