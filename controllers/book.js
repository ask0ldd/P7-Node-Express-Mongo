const Book = require('../models/Book')

/*exports.getBooks = (req, res, next) => { 
    const books = [
      {
        _id: 'oeihfzeomoihi',
        title: 'the name of the wind',
        author: 'patrick rothfuss',
        imageUrl: 'https://m.media-amazon.com/images/I/71jJcPTGd3L.jpg',
        year: '2008',
        genre: 'fantasy',
        ratings:    {
                        userID: 'oeihfzeomoihi',
                        grade: '4'
                    },
        averageRating: '4.5'},
        {
            _id: 'oeihfzeomoihi',
            title: 'the name of the wind',
            author: 'patrick rothfuss',
            imageUrl: 'https://m.media-amazon.com/images/I/71jJcPTGd3L.jpg',
            year: '2008',
            genre: 'fantasy',
            ratings:    {
                            userID: 'oeihfzeomoihi',
                            grade: '4'
                        },
            averageRating: '4.5'}
    ]
    res.status(200).json(books)
}*/

// verifier que le book n'existe pas deja ?
exports.postBook = (req, res, next) => { 
    const book = new Book({...JSON.parse(req.body.book), imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`}) // replacer user id par celui du token
    //console.log("book", book)
    
    book.save()
        .then(() => res.status(201).json({ message: 'Book enregistré !'}))
        .catch(error => res.status(400).json({ error }))
}

exports.getBook = (req, res, next) => { 
    Book.findOne({ _id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }))
}

exports.deleteBook = (req, res, next) => { // verify user?
    console.log(req.params.id)
    Book.deleteOne({ _id: req.params.id })
    .then(book => res.status(200).json("deleted"))
    .catch(error => res.status(404).json({ error }))
}

exports.getAllBooks = (req, res, next) => { 
    Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(404).json({ error }))
}

exports.getTop = (req, res, next) => {
    Book.find().limit(3).sort({averageRating:-1})
    .then(books => res.status(200).json(books))
    .catch(error => res.status(404).json({ error }))
}

/*
person.friends.push(friend);
person.save(done);
*/

exports.postRating = (req, res, next) => { // verifier que l'utilisateur n'a pas deja poste une note via middleware?
    //const {userId, rating} = req.body // recuperer userid via token?
    console.log(req.body)
    const {userId, rating} = req.body
    console.log(req.params.id)
    Book.updateOne(
        { _id: req.params.id },
        { $push: {ratings : { userId : userId, grade : rating }} })
        .then(books => {
            res.status(201).json("rating posted.") // renvoyer le book
            req.bookId = req.params.id // value to pass to the next middleware
            next()})
        .catch(error => res.status(404).json({ error }))
}

exports.updateAvgRating = (req, res, next) => {
    //console.log(req.locals.id) // res -> req
    Book.updateOne(
        { _id: req.bookId}, // select // res -> req
        { $set :{ "averageRating" : req.bookAvg }} // $ = first result // res -> req
        )
        .then(books => console.log("updated avg rating"))
        .catch(error => console.log({ error }))
}


/*exports.postRating = (req, res, next) => {
    console.log("postrating")
    console.log({...req.body})
    const {bookid, userid, grade}= req.body // recuperer userid via token?
    console.log(bookid)
    Book.updateOne(
        { _id: bookid },
        { author : "joe abercrombie"})
        .then(books => res.status(201).json("okdoki"))
        .catch(error => res.status(404).json({ error }))
}*/

// bestrating 3 books avec la meilleure note

// 4.5 => 45

//utilisateur ne doit pas pouvoir noter un livre plusieurs fois


/*exports.updateRating = (req, res, next) => {
    const {bookid, userid, grade}= req.body // recuperer userid via token?
    Book.updateOne(
        { _id: bookid, 'ratings.userId' : userid}, // select
        { $set :{ "ratings.$.grade" : grade }} // $ = first result
        )
        .then(books => res.status(201).json("updated rating"))
        .catch(error => res.status(404).json({ error }))
}*/
