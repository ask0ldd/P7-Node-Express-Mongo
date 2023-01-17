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
            // group send back an array
            req.bookAvg = result[0].avg.toFixed(1) // 1 decimal only
            if (req.bookAvg < 0) req.bookAvg = 0
            if (req.bookAvg > 5) req.bookAvg = 5
            next()})
        .catch(error => console.log(error))     
    } catch(error) {
        // internal process so no need of res.status(40x)
        console.log(error)
    }
 }