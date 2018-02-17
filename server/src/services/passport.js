import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'

import User from '../models/user'

function isPasswordValid(password, databasePassword) {
  // Always use hash passwords
  bcrypt.compare(password, databasePassword, (err, isValid) => {
    if (err) return false

    if (!isValid) return false

    return true
  })
}

function getLocalStrategy() {
  return new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username }).catch(err => done(err))

    if (!user) return done(null, false)

    const databasePassword = user.password_hash

    if (!isPasswordValid(password, databasePassword)) {
      return done(null, false, { errors: { 'username or password': 'invalid' } })
    }

    return done(null, userToJSON(user))
  })
}

function userToJSON({ id, username, email }) {
  return { id, username, email }
}

export default {
  getLocalStrategy,
  userToJSON,
}
