/** @format */

const express = require('express');
const router = express.Router();

router.post('/api', (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(404);
    res.json('404 Укажите корректно почту');
  }
  res.status(201);
  res.json({ id: 1, mail: `${email}` });
});

module.exports = router;
