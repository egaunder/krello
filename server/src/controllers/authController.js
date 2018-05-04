import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import authConfig from '../config/authConfig'
import User from '../models/user'

export const signup = async (req, res) => {
  const { username, password, email } = req.body
  if (!username) {
    return res.status(422).json({ username: "can't be blank" })
  }
  if (!password) {
    return res.status(422).json({ password: "can't be blank" })
  }

  if (!email) {
    return res.status(422).json({ email: "can't be blank" })
  }
  const hashedPassword = await getSaltedHashedPassword(password)

  const existingUser = await User.findOne({ username }).catch(err => {
    /* eslint-disable no-console */
    console.error(err)
    return res
      .status(500)
      .json({ error: 'Server encountered an internal error retieving the user' })
  })

  if (existingUser) {
    return res.status(422).json({ error: { username: 'taken' } })
  }

  const newUser = await User.create({
    username,
    email,
    password_hash: hashedPassword,
  }).catch(error => {
    /* eslint-disable no-console */
    console.error(error)
    return res
      .status(500)
      .json({ error: 'Server encountered an internal error trying to create resource' })
  })

  const token = getUserToken(newUser)
  return res.status(200).json(authUserToJson(token, newUser))
}

export const login = async (req, res) => {
  const { username, password } = req.body
  if (!username) {
    return res.status(422).json({ username: "can't be blank" })
  }

  if (!password) {
    return res.status(422).json({ password: "can't be blank" })
  }

  const user = await User.findOne({ username }).catch(error => {
    /* eslint-disable no-console */
    console.error(error)
    return res
      .status(500)
      .json({ error: 'Server encountered an internal error while processing your request' })
  })

  if (!user) {
    return res.status(422).json({ error: { username: 'Username does not exist' } })
  }

  if (await isPasswordValid(password, user.password_hash)) {
    const token = getUserToken(user)
    return res.status(200).json(authUserToJson(token, user))
  }

  return res.status(422).json({ error: { username: 'Username does not exist' } })
}

export const getUserToken = user => {
  if (!user) {
    return ''
  }
  const { expiresIn, secret } = authConfig

  const token = jwt.sign({ id: user.id }, secret, { expiresIn })

  return token
}

export const authUserToJson = (token, user) => Object.assign({}, { token }, userToJson(user))

export const userToJson = user => {
  if (!user) {
    return {}
  }
  const id = user.id || ''
  const username = user.username || ''
  const email = user.email || ''
  return { id, username, email }
}

export const isPasswordValid = (password, hash) => {
  if (!password && !hash) {
    return false
  }
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}

export const getSaltedHashedPassword = password => {
  if (!password) {
    return ''
  }

  const { saltRounds } = authConfig
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(err)
      }
      resolve(hash)
    })
  })
}
