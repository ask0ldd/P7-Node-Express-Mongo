const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mdp = require('./mdp')

const bookRoutes = require('./routes/book')
const userRoutes = require('./routes/user')

// todo : connexion db
mongoose.connect(mdp,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

const app = express()

/*app.use((req, response, next)=> {
    console.log("requete recue") 
    next()
}) // console > powershell et non console browser*/

app.use(express.json()); // permet d'extraire le corps json de la requete

app.use((req, res, next) => { // header to deal with CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json())

app.use('/api/book', bookRoutes)
app.use('/api/auth', userRoutes)

module.exports = app // permet d'acceder a l'application depuis nos autres fichiers, notamment serveur node