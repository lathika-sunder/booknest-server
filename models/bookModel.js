const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,

    },
    author: {
        type: String,
        required: true,

    },
    title: {
        type: String,
        required: true,

    },
   
    publisher: {
        type: String,
        required: true,

    },
    genre: {
        type: String,
        required: true,

    },
    language: {
        type: String,
        required: true,

    },
    publishedDate: {
        type: Date,
        default: Date.now
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
