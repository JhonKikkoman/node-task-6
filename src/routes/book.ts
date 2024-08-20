/** @format */

import { Router, Request, Response } from 'express';
import upload from '../middleware/uploadFile';
import bookSchema from '../models/bookSchema';
import myContainer from '../models/inversify.config';
import { BooksRepository } from '../models/enities';
import { TYPES } from '../models/types';

const router = Router();
const repo: BooksRepository = myContainer.get<BooksRepository>(TYPES.Book);

// все книги
router.get('/books', async (req, res) => {
  try {
    const books = await repo.getBooks();
    res.json(books);
  } catch (e) {
    res.status(500);
    res.json(e);
  }
});

// книга по ID
router.get('/book/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await repo.getBook(id);
    res.json(book);
  } catch (e) {
    res.status(500);
    res.json(e);
  }
});

// создать(добавить) книгу
router.post('/addBook', async (req, res) => {
  const { title, description } = req.body;
  try {
    const book = await repo.createBook(title, description);
    res.json(book);
  } catch (e) {
    res.status(500);
    res.json(e);
  }
});

// обновить книгу
router.put('/updateBook/:id', async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  try {
    await repo.updateBook(id, title, description);
    res.redirect(`http://localhost:3000/index/${id}`);
  } catch (e) {
    res.json(500);
    res.json(e);
  }
});

// удалить книгу
router.delete('/deleteBook/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const isDeleted = await repo.deleteBook(id);
    if (isDeleted.deletedCount === 1) {
      res.json({ book: 'deleted' });
    } else {
      res.json({ book: 'failed to delete' });
    }
  } catch (e) {
    res.status(500);
    res.json(e);
  }
});

// загрузка книги на сервер
router.post(
  '/uploadBook/:id',
  upload.single('book'),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { path } = req.file;
    try {
      const book = await bookSchema.findByIdAndUpdate(id, {
        $set: { fileName: path },
      });
      res.status(201);
      res.json(book);
    } catch (e) {
      res.status(500);
      res.json(e);
    }
  }
);

// загрузка книги на клиент
router.get('/downloadBook/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await bookSchema.findById(id).select('-__v');
    res.download(book.fileName);
  } catch (e) {
    res.status(500);
    res.json(e);
  }
});

export default router;
