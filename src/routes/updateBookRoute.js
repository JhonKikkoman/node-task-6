/** @format */

const express = require('express');
const data = require('../data/data');

const router = express.Router();

router.put('/api', (req, res) => {
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

module.exports = router;
