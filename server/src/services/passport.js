import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import passport from 'passport'

import User from '../models/user'
import authConfig from '../config/authConfig'

const opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = authConfig.secret

passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
  const user = await User.findById({ id: jwtPayload.sub })
    .catch(err => done(err, false))

  if (user) {
    return done(null, { id: user.id })
  }

  return done(null, false)
}))
