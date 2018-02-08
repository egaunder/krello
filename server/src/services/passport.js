import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

import User from '../models/user';

const localStrategy = async (req, email, password, done) => {
  const user = await User.findOne({
    email,
  }).catch(err => done(err));

  if (!user) return done(null, false);

  const databasePassword = user.password_hash;

  // Always use hash passwords
  bcrypt.compare(password, databasePassword, (err, isValid) => {
    if (err) return done(err);

    if (!isValid) return done(null, false);

    return done(null, user);
  });
};

passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    localStrategy,
  ),
);
