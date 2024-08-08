/** @format */

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const http = require('http');
const socketIO = require('socket.io');
const onConnection = require('./socket_io/onConnection');

const err404 = require('./middleware/err404');
// const logger = require('./middleware/logger');

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

io.on('connection', (socket) => {
  onConnection(io, socket);
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
    server.listen(PORT, () => {
      console.log('server stared on http://localhost:' + PORT);
    });
  } catch (e) {
    console.log(e);
  }
}
const PORT = process.env.PORT || 3000;
start(PORT);
