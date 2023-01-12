const Book = require('../models/Book')
const mongoose = require('mongoose');

module.exports = (req, res, next) => {
    try {
        Book.aggregate([{ $match: { _id: mongoose.Types.ObjectId(req.bookId) } }])
        .unwind("$ratings")
        .group({
            "_id" : null, // mandatory
            "avg" : { "$avg" : "$ratings.grade" }})
        .then(result => {
            console.log(result[0].avg) // groupe renvoie un tableau donc [0]?
            req.bookAvg = result[0].avg.toFixed(1) // res -> req // arrondir
            next()})
        .catch(error => console.log(error))     
    } catch(error) {
        //res.status(401).json({ error })
        console.log(error)
    }
 }