import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { omit } from 'lodash';

import User from '../models/user';

function userToJSON({
  id,
  username,
  email,
  ...otherUserProps
}) {
  return {
    id,
    username,
    email,
    ...omit(otherUserProps, ['password_hash', 'created_at']),
  };
}

function isPasswordValid(password, databasePassword) {
  // Always use hash passwords
  bcrypt.compare(password, databasePassword, (err, isValid) => {
    if (err) return false;

    if (!isValid) return false;

    return true;
  });
}

function getLocalStrategy() {
  return new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({
      username,
    }).catch(err => done(err));

    if (!user) return done(null, false);

    const databasePassword = user.password_hash;

    if (!isPasswordValid(password, databasePassword)) {
      return done(null, false, {
        errors: { 'username or password': 'invalid' },
      });
    }

    return done(null, userToJSON(user));
  });
}

export default {
  getLocalStrategy,
  userToJSON,
};
