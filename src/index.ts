/** @format */

import { json, urlencoded, } from 'express';
import process from 'process';
import express from 'express';
import session from 'express-session';
import { connect } from 'mongoose';
import passport from 'passport';
import { Server } from 'http';
import { Server as ServerIo } from 'socket.io';
import onConnection from './socket_io/onConnection';

import err404 from './middleware/err404';
// const logger = require('./middleware/logger');

import booksRouter from './routes/book';
import viewsRouter from './routes/viewsRoute';
import counterRouter from './routes/counter';
import authRouter from './routes/auth';

const app = express();
const server = new Server(app);
const io = new ServerIo(server);

app.use(json());
app.use(urlencoded());
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

async function start(PORT: string | number) {
  try {
    await connect('mongodb://ec9aacc37eeb:27017', {
      dbName: 'books',
    }).then(() => console.log('-----------Connected to DB-----------'));
    server.listen(PORT, () => {
      console.log('server stared on http://localhost:' + PORT);
    });
  } catch (e) {
    console.log(e);
  }
}
const PORT = process.env.PORT || 3000;
start(PORT);
