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
    isAvailable:{
        type:Boolean,
        default:true
    }
});
bookSchema.index({bookName:'text'})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
