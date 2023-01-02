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

exports.postBook = (req, res, next) => { 
    const book = new Book({...req.body})
    book.save()
          .then(() => res.status(201).json({ message: 'Book enregistré !'}))
          .catch(error => res.status(400).json({ error }))
}

exports.getBook = (req, res, next) => { 
    Book.findOne({ _id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }))
}