const http = require('http')

const server = http.createServer((req, resp)=>{
    resp.end("reponseduserveurezaeazeaz")
}) // fonction qui sera appelee pour chaque requete recue par le serveur

server.listen(process.env.PORT || 3000) // au cas ou port 3000 indispo, ou simplement si l'environnement ou tourne serveur nous communique un port a utiliser

