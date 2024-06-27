/** @format */

const express = require('express');
const router = express.Router();
const data = require('../data/data');
const Book = require('../data/entityBook');

router.get('/', (req, res) => {
  res.render('index', { data });
});

router.get('/create', (req, res) => {
  res.render('./pages/create');
});

router.post('/create', (req, res) => {
  const { title, description } = req.body;
  const book = new Book(title, description);
  data.push(book);
  res.redirect('/index');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const bookIndx = data.findIndex((elem) => elem.id === id);

  if (bookIndx === -1) {
    res.redirect('/index');
  }
  res.render('./pages/view', { book: data[bookIndx] });
});

router.get('/edit/:id', (req, res) => {
  const { id } = req.params;
  const bookIndx = data.findIndex((elem) => elem.id === id);
  if (bookIndx === -1) {
    res.json('404 | Страница не найдена');
  }
  res.render('./pages/update', { book: data[bookIndx] });
});

router.post('/edit/:id', (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  const bookIndx = data.findIndex((elem) => elem.id === id);

  if (bookIndx === -1) {
    res.json('404 | не удалось обновить страницу');
  }
  data[bookIndx] = {
    ...data[bookIndx],
    title,
    description,
  };
  res.redirect('/index');
});

router.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  const bookIndx = data.findIndex((elem) => elem.id === id);
  if (bookIndx === -1) {
    res.json('404 | Не удалось удалить книгу');
  }
  data.splice(bookIndx, 1);
  res.redirect('/index');
});

module.exports = router;
