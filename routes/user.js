const express = require ("express")
const router = express.Router()

const userCtrl = require ('../controllers/user')

// middleware // '/' : added to the uri already specified in app.js : app.use('/api/books', bookRoutes)
router.post('/signup', userCtrl.signup) // pass function ie no ()
router.post('/login', userCtrl.login) 

module.exports = router