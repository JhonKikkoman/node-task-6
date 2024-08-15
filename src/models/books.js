/** @format */

import { model, Schema } from 'mongoose';

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

export default model('book', bookSchema);
