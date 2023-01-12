const express = require('express')
//const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mdp = require('./mdp')

const bookRoutes = require('./routes/book')
const userRoutes = require('./routes/user')
const path = require('path');

// todo : connexion db
mongoose.connect(mdp,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

const app = express()

app.use('/images', express.static(path.join(__dirname, 'images'))) // accepting requests asking to get an image from /images

app.use(express.json()) // extract json from request body
// app.use(express.urlencoded({extended:true}))// car request post rating body Content-Type: application/x-www-form-urlencoded

//app.post('/api/books', multer().any()) // any = temp

app.use((req, res, next) => { // header to deal with CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    //res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, X-Auth-Token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/books', bookRoutes)
app.use('/api/auth', userRoutes)

module.exports = app // permet d'acceder a l'application depuis nos autres fichiers, notamment server node