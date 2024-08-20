/** @format */

import 'reflect-metadata';
import bookSchema from './bookSchema';
import { injectable } from 'inversify';

export interface entityBook {
  id: string;
  title: string;
  description: string;
  authors: string;
  favorite: string;
  fileCover: string;
  fileName: string;
}

@injectable()
export class BooksRepository implements entityBook {
  id: string;
  title: string;
  description: string;
  authors: string;
  favorite: string;
  fileCover: string;
  fileName: string;

  async createBook(title: string, description: string) {
    const newBook = new bookSchema({ title, description });
    await newBook.save();
    return newBook;
  }
  async getBook(id: string) {
    const book = await bookSchema.findById(id).select('-__v');
    return book;
  }
  async getBooks() {
    const books = await bookSchema.find().select('-__v');
    return books;
  }
  async updateBook(id: string, title: string, description: string) {
    const book = await bookSchema.findByIdAndUpdate(id, {
      title,
      description,
    });
    if (book === null) {
      return new Error("book wasn't finded");
    }
    return book;
  }
  async deleteBook(id: string) {
    const isDeleted = await bookSchema.deleteOne({ _id: id });
    return isDeleted;
  }
}
