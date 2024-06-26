/** @format */

const express = require('express');
const fileMulter = require('../middleware/uploadFile');
const router = express.Router();
const data = require('../data/data');
const Book = require('../data/entityBook');
const dir = require('../index');

// все книги
router.get('/books', (req, res) => {
  res.json(data);
});

// книга по ID
router.get('/book/:id', (req, res) => {
  const { id } = req.params;
  const bookIndx = data.findIndex((elem) => elem.id === id);

  if (bookIndx !== -1) {
    res.json(data[bookIndx]);
  } else {
    res.status(404);
    res.json('404 Страница не найдена ');
  }
});

// создать(добавить) книгу
router.post('/addBook', (req, res) => {
  const { title } = req.body;
  if (!title) {
    res.status(404);
    res.json('404 Не удалось добавить книгу без названия');
  }
  const newBook = new Book(title);
  data.push(newBook);
  res.status = 201;
  res.json(newBook);
});

// логин
router.post('/login', (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(404);
    res.json('404 Укажите корректно почту');
  }
  res.status(201);
  res.json({ id: 1, mail: `${email}` });
});

// обновить книгу
router.put('/updateBook/:id', (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  const bookIndx = data.findIndex((elem) => elem.id === id);
  if (!title) {
    res.status(404);
    res.json('404 Не удалось обновить книгу без названия');
  }
  if (bookIndx !== -1) {
    data[bookIndx] = {
      ...data[bookIndx],
      title,
    };
    res.json(data);
  } else {
    res.status(404);
    res.json('404 Страница не найдена');
  }
});

// удалить книгу
router.delete('/deleteBook/:id', (req, res) => {
  const { id } = req.params;
  const bookIndx = data.findIndex((elem) => elem.id === id);
  if (bookIndx !== -1) {
    data.splice(bookIndx, 1);
    res.json(true);
  } else {
    res.status(404);
    res.json('404 Страница не найдена1');
  }
});

// загрузка книги на сервер
router.post('/uploadBook/:id', fileMulter.single('book'), (req, res) => {
  const { id } = req.params;
  const bookIndx = data.findIndex((el) => el.id === id);
  if (req.file && bookIndx !== -1) {
    const { path } = req.file;
    data[bookIndx].fileBook = path;
    res.json(data[bookIndx]);
  }
  res.json();
});

// загрузка книги на клиент
router.get('/downloadBook/:id', (req, res) => {
  const { id } = req.params;
  const bookIndx = data.findIndex((el) => el.id === id);
  if (bookIndx !== -1) {
    res.status(200);
    res.download(`${dir}\/${data[bookIndx].fileBook}`, (err) => {
      if (err) {
        throw new Error(err);
      }
    });
  } else {
    res.status(404);
    res.json('404 Страница не найдена1');
  }
});

module.exports = router;
