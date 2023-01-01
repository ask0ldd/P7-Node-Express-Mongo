const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const bookRoutes = require('./routes/book')

// todo : connexion db

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

app.use('/api/books', bookRoutes)

module.exports = app // permet d'acceder a l'application depuis nos autres fichiers, notamment serveur node