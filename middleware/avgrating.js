const Book = require('../models/Book')
const mongoose = require('mongoose');

/*module.exports = (req, res, next) => {
    try {
        //next()

        //console.log(Book.findOne({ _id: "63b4a70e516c692da3c9d477" }).aggregate(([{$group: {avgrating:{$avg:"$points"}}}])))
        Book.aggregate([
            { $match : {_id : mongoose.Types.ObjectId(res.locals.id)} }, // select
            { $unwind : "$ratings" }, // create one full document per element in the array 
            { "$group" : {
                "_id" : null, // mandatory
                "avg" : { "$avg" : "$ratings.grade" }}}])
            .then(result => {
                console.log(result[0].avg)
                res.locals.avg = result[0].avg
                next()})
            .catch(error => console.log(error))     
    } catch(error) {
        //res.status(401).json({ error })
        console.log(error)
    }
 }*/

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