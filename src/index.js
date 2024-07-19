/** @format */

const dir = __dirname;
module.exports = dir;
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const err404 = require('./middleware/err404');
const logger = require('./middleware/logger');

const booksRouter = require('./routes/book');
const viewsRouter = require('./routes/viewsRoute');
const counterRouter = require('./routes/counter');
const authRouter = require('./routes/auth');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.use(express.json());
app.use(express.urlencoded());
app.use(session({ secret: 'SECRET' }));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());

// app.use('/', logger);

io.on('connection', (stream) => {
  const { id } = stream;
  console.log(`Socket id - ${id}`);
  stream.on('message-me', (msg) => {
    msg.type = 'me';
    stream.emit('message-me', msg);
  });
  stream.on('message-all', (msg) => {
    msg.type = 'all';
    stream.broadcast.emit('message-all', msg);
    stream.emit('message-all', msg);
  });
  const { roomName } = stream.handshake.query;
  console.log(`Socket room - ${roomName}`);
  stream.join(roomName);
  stream.on('message-room', (msg) => {
    msg.type = `room: ${roomName}`;
    stream.to(roomName).emit('message-all', msg);
    stream.emit('message-all', msg);
  });
  stream.on('disconnect', () => {
    console.log(`Socket disconnected: ${id}`);
  });
});

app.use('/', authRouter);

app.use('/api', booksRouter);

app.use('/index', viewsRouter);

app.use('/counter', counterRouter);

app.use(err404);

async function start(PORT) {
  try {
    await mongoose
      .connect('mongodb://ec9aacc37eeb:27017', {
        dbName: 'books',
      })
      .then(() => console.log('-----------Connected to DB-----------'));
    app.listen(PORT, () => {
      console.log('server stared on http://localhost:' + PORT);
    });
  } catch (e) {
    console.log(e);
  }
}
const PORT = process.env.PORT || 3000;
start(PORT);
