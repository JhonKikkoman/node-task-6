/** @format */

const express = require('express');
const redis = require('redis');
const router = express.Router();

const REDIS_URL = process.env.REDIS_URL || 'localhost';
const client = redis.createClient({ url: REDIS_URL });

(async () => {
  await client.connect();
})();

router.get('/:bookId', (req, res) => {
  const { bookId } = req.params;
  const dataBook = client.get(bookId);
  dataBook.then((data) => {
    res.json({ counter: data });
  });
});

router.post('/:bookId/incr', async (req, res) => {
  const { bookId } = req.params;
  try {
    await client.incr(bookId);
    res.status(201);
    res.json('increased');
  } catch (error) {
    res.json(`Error - ${error}`);
  }
});

module.exports = router;
