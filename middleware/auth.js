const jwt = require('jsonwebtoken')
 
module.exports = (req, res, next) => {
   try {
        const token = req.headers.authorization.split(' ')[1] // couper apres bearer
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
        const userId = decodedToken.userId // decoded token contient?
        req.auth = { // local
            userId: userId
        }
	    next()
   } catch(error) {
       res.status(401).json({ error })
   }
};