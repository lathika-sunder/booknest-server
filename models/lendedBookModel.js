const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lendedBookSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookId: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  lendedDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  }
});

const LendedBook = mongoose.model('LendedBook', lendedBookSchema);

module.exports = LendedBook;
