/** @format */

import { Router } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy, VerifyFunction} from 'passport-local';
import { findByUserName, verifyPassword, findById } from '../fakeDb/users';

const router = Router();

declare global {
  namespace Express {
      interface User {
        id: number,
      }
  }
}

const verify: VerifyFunction = (username, password, done) => {
  findByUserName(username, (error, user) => {
    if (error) {
      return done(error);
    }
    if (!user) {
      return done(null, false, {
        message: 'User not found',
      });
    }
    if (!verifyPassword(user, password)) {
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

passport.deserializeUser((id: number, done) => {
  findById(id, (error, user) => {
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
  req.logout(() => {
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

export default router;
