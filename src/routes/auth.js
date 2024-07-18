/** @format */

const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const fakeDb = require('../fakeDb');

const verify = (username, password, done) => {
  fakeDb.users.findByUserName(username, (error, user) => {
    if (error) {
      return done(err);
    }
    if (!user) {
      return done(null, false, {
        message: 'User not found',
      });
    }
    if (!fakeDb.users.verifyPassword(user, password)) {
      return done(null, false, {
        message: 'Wrong password',
      });
    }
    return done(null, user);
  });
};

passport.use(
  'local',
  new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' },
    verify
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  fakeDb.users.findById(id, (error, user) => {
    if (error) {
      done(error);
    }
    done(null, user);
  });
});

router.get('/', (req, res) => {
  res.render('./pages/home', { user: req.user });
});

router.get('/login', (req, res) => {
  res.render('./pages/auth');
});

router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/index');
  }
);

router.get('/index/logout', (req, res) => {
  req.session.destroy((error) => {
    res.redirect('/');
  });
});

router.get(
  '/index/profile',
  (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.redirect('/login');
    }
    next();
  },
  (req, res) => {
    res.render('./pages/profile', { user: req.user });
  }
);

module.exports = router;
