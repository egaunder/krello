import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { getSaltedHashedPassword, getUserToken, isPasswordValid, userToJson } from '../authController'
import authConfig from '../../config/authConfig'

describe('userToJson', () => {
  test('should return an object', () => {
    const result = userToJson()
    expect(typeof result).toBe('object')
  })

  test('should return a user object', () => {
    const id = 'jfdsklu432u4j2kjelj43l'
    const username = 'Elvan'
    const email = 'egaunder@g123.com'
    const passwordHashed = 'jfkj2lj34lk2jrlkfje09duoil'
    const createdAt = 'some date'

    const user = {
      id,
      username,
      email,
      password_hashed: passwordHashed,
      created_at: createdAt,
    }

    const jsonUser = {
      id,
      username,
      email,
    }

    const result = userToJson(user)
    expect(result).toEqual(jsonUser)
  })
})

describe('isPasswordValid', () => {
  test('should return a boolean value', async () => {
    const result = await isPasswordValid()
    expect(typeof result).toBe('boolean')
  })

  test('should return false if password and hash do not match', done => {
    const password = '1234'
    const wrongPassword = '2345'
    bcrypt.hash(password, 10, async (err, hash) => {
      const result = await isPasswordValid(wrongPassword, hash)
      expect(result).toBe(false)
      done()
    })
  })

  test('should return true if password and hash do match', done => {
    const password = '1234'
    bcrypt.hash(password, 10, async (err, hash) => {
      const result = await isPasswordValid(password, hash)
      expect(result).toBe(true)
      done()
    })
  })
})

describe('getUserToken', () => {
  test('should return a string', () => {
    const result = getUserToken()
    expect(typeof result).toBe('string')
  })

  test('should return a valid user token', () => {
    const user = { id: '1234' }
    const { secret, expiresIn } = authConfig

    const validToken = jwt.sign({ id: user.id }, secret, { expiresIn })
    const result = getUserToken(user)
    expect(result).toBe(validToken)
  })
})

describe('getSaltedHashedPassword', () => {
  test('should return a string', async done => {
    const result = await getSaltedHashedPassword()
    expect(typeof result).toBe('string')
    done()
  })

  test('should return a ')
})
