/** @format */

const express = require('express');
const dir = require('../index');
const data = require('../data/data');

const router = express.Router();

router.get('/api', (req, res) => {
  const { id } = req.params;
  const bookIndx = data.findIndex((el) => el.id === id);
  if (bookIndx !== -1) {
    res.status(200);
    res.download(`${dir}+${data[bookIndx].fileBook}`);
  } else {
    res.status(404);
    res.json('404 Страница не найдена1');
  }
});

module.exports = router;
