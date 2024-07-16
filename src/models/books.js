/** @format */

const { model, Schema } = require('mongoose');

const bookSchema = new Schema({
  id: String,
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  authors: String,
  favorite: String,
  fileCover: String,
  fileName: String,
});

module.exports = model('book', bookSchema);
