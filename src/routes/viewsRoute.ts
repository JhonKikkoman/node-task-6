/** @format */

import { Router } from 'express';
import bookSchema from '../models/bookSchema';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const books = await bookSchema.find().select('-__v');
    res.render('index', { books });
  } catch (e) {
    res.status(500);
    res.json(e);
  }
});

router.get('/create', (req, res) => {
  res.render('./pages/create');
});

router.post('/create', async (req, res) => {
  const { title, description } = req.body;
  const newBook = new bookSchema({
    title,
    description,
  });
  try {
    await newBook.save();
    res.json(newBook);
  } catch (e) {
    res.status(500);
    res.json(e);
  }
});

router.get('/pages/view/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await bookSchema.findById(id).select('-__v');
    if (book === null) {
      res.redirect('/index');
    }
    res.render('./pages/view', { book });
  } catch (e) {
    res.status(500);
    res.json(e);
  }
});

router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await bookSchema.findById(id).select('-__v');
    if (book === null) {
      res.redirect('/index');
    }
    res.render('./pages/update', { book });
  } catch (e) {
    res.status(500);
    res.json(e);
  }
});

router.post('/edit/:id', async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  try {
    await bookSchema.findByIdAndUpdate(id, { title, description });
    res.redirect('/index');
  } catch (e) {
    res.status(500);
    res.json(e);
  }
});

router.post('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await bookSchema.deleteOne({ _id: id });
    res.json('ok');
  } catch (e) {
    res.status(500);
    res.json(e);
  }
});

export default router;
