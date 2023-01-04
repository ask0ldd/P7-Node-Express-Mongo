const Book = require('../models/Book')
const mongoose = require('mongoose');

module.exports = (req, res, next) => {
    try {
        //next()

        //console.log(Book.findOne({ _id: "63b4a70e516c692da3c9d477" }).aggregate(([{$group: {avgrating:{$avg:"$points"}}}])))
        Book.aggregate([
            { $match : {_id : mongoose.Types.ObjectId(res.locals.id)} }, // select
            { $unwind : "$ratings" }, // create one full document per element in the array 
            { "$group" : {
                "_id" : null, // mandatory
                "avg" : { "$avg" : "$ratings.grade" }}}
        ]).then(result => console.log(result[0].avg)).catch(error => console.log(error))
        
    } catch(error) {
        //res.status(401).json({ error })
        console.log(error)
    }
 }

 /*
db.clothing.insertMany([
  { "_id" : 1, "item" : "Shirt", "sizes": [ "S", "M", "L"] },
  { "_id" : 2, "item" : "Shorts", "sizes" : [ ] },
  { "_id" : 3, "item" : "Hat", "sizes": "M" },
  { "_id" : 4, "item" : "Gloves" },
  { "_id" : 5, "item" : "Scarf", "sizes" : null }
])

db.clothing.aggregate( [ { $unwind: { path: "$sizes" } } ] )

returns

{ _id: 1, item: 'Shirt', sizes: 'S' },
{ _id: 1, item: 'Shirt', sizes: 'M' },
{ _id: 1, item: 'Shirt', sizes: 'L' },
{ _id: 3, item: 'Hat', sizes: 'M' }*/