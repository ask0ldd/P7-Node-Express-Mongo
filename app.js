const express = require('express')

const app = express()

app.use((req, response, next)=> {
    console.log("requete recue") 
    next()
}) // console > powershell et non console browser

app.use((req, response, next)=> {
    response.status(201)
    next()
})

app.use((req, response, next)=> {
    response.json({message : "votrerequetebienrecue"})
}) // middleware





module.exports = app // permet d'acceder a l'application depuis nos autres fichiers, notamment serveur node