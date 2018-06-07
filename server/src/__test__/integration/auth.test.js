import axios from 'axios'
import getPort from 'get-port'

import startServer from '../../start'
import { clearTestDb } from '../../utils/test_helper'

let server
let baseURL

beforeAll(async () => {
  const port = await getPort()
  server = await startServer({ port })
  baseURL = `http://localhost:${server.address().port}/auth`
})

afterAll(async () => {
  clearTestDb()
  await server.close()
})

test('should not be able to signup a user without username', async done => {
  const username = ''
  const email = 'test@test.com'
  const password = '1234'

  const user = { username, email, password }
  await axios.post(`${baseURL}/signup`, user)
    .then(res => res.data)
    .catch(err => {
      /* eslint-disable no-prototype-builtins */
      expect(err.response.data.hasOwnProperty('username')).toBe(true)
      done()
    })
})

test('should not be able to signup a user without email', async done => {
  const username = 'egaunder'
  const email = ''
  const password = '1234'

  const user = { username, email, password }
  await axios.post(`${baseURL}/signup`, user)
    .then(res => res.data)
    .catch(err => {
      /* eslint-disable no-prototype-builtins */
      expect(err.response.data.hasOwnProperty('email')).toBe(true)
      done()
    })
})

test('should not be able to signup a user without password', async done => {
  const username = 'egaunder'
  const email = 'egaunder@test.com'
  const password = ''

  const user = { username, email, password }
  await axios.post(`${baseURL}/signup`, user)
    .then(res => res.data)
    .catch(err => {
      /* eslint-disable no-prototype-builtins */
      expect(err.response.data.hasOwnProperty('password')).toBe(true)
      done()
    })
})

test('should be able to signup a valid user', async done => {
  const username = 'egaunder'
  const email = 'egaunder@test.com'
  const password = '1234'

  const user = { username, email, password }
  const newUser = await axios.post(`${baseURL}/signup`, user)
    .then(res => res.data)

  expect(newUser.hasOwnProperty('token')).toBe(true)
  expect(newUser.username).toBe(username)
  expect(newUser.email).toBe(email)
  done()
})

test('should not be able to login without username', async done => {
  const username = 'egaunder2'
  const email = 'egaunder2@test.com'
  const password = '1234'
  const noUsername = ''

  const user = { username, email, password }
  await axios.post(`${baseURL}/signup`, user)
    .then(res => res.data)

  const inValidUser = { username: noUsername, email, password }

  await axios.post(`${baseURL}/login`, inValidUser)
    .catch(err => {
      const { data } = err.response
      expect(data.hasOwnProperty('username')).toBe(true)
      done()
    })
})

test('should not be able to login without password', async done => {
  const username = 'egaunder3'
  const email = 'egaunder3@test.com'
  const password = '1234'
  const noValidPassword = ''

  const user = { username, email, password }
  await axios.post(`${baseURL}/signup`, user)
    .then(res => res.data)

  const inValidUser = { username, email, password: noValidPassword }

  await axios.post(`${baseURL}/login`, inValidUser)
    .catch(err => {
      const { data } = err.response
      expect(data.hasOwnProperty('password')).toBe(true)
      done()
    })
})

test('should be able to login with valid user', async done => {
  const username = 'egaunder4'
  const email = 'egaunder4@test.com'
  const password = '1234'
  const user = { username, email, password }
  await axios.post(`${baseURL}/signup`, user)
    .then(res => res.data)

  const userLoggedIn = await axios.post(`${baseURL}/login`, user)
    .then(res => res.data)
  expect(userLoggedIn.username).toBe(username)
  expect(userLoggedIn.email).toBe(email)
  expect(userLoggedIn.hasOwnProperty('token')).toBe(true)
  done()
})
