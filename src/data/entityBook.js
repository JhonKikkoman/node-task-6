/** @format */

const { v4: uuidv4 } = require('uuid');

module.exports = class Book {
  constructor(title) {
    this.id = uuidv4();
    this.title = title;
    this.description = '';
    this.authors = '';
    this.favorite = false;
    this.fileCover = '';
    this.fileName = '';
    this.fileBook = '';
  }
};
