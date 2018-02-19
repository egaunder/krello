import axios from 'axios'
import faker from 'faker'

import startServer from '../../start'
import { clearTestDb } from '../../utils/test_helper'

let server, baseURL

beforeAll(async () => {
  server = await startServer({ port: 6000 })
  baseURL = `http://localhost:${server.address().port}/api/boards`
})

afterAll(async () => {
  await clearTestDb()
  await server.close()
})

test('get board', async done => {
  const newBoard = {
    name: 'Elvan',
    userId: 'sj2k34',
    category: 'Studies',
  }

  const board = await axios.post(baseURL, newBoard).then(res => res.data)
  const getBoard = await axios.get(`${baseURL}/${board.id}`).then(res => res.data)
  expect(getBoard.id).toBe(board.id)
  expect(getBoard.name).toBe(board.name)
  expect(getBoard.category).toBe(board.category)
  done()
})

test('get boards', async done => {
  const userId = '111'

  const board1 = {
    name: faker.name.findName(),
    userId,
    category: 'Studies',
  }

  const board2 = {
    name: faker.name.findName(),
    userId,
    category: 'Category 2',
  }

  const board3 = {
    name: faker.name.findName(),
    userId,
    category: 'Category 3',
  }

  await axios.post(baseURL, board1).then(res => res.data)
  await axios.post(baseURL, board2).then(res => res.data)
  await axios.post(baseURL, board3).then(res => res.data)

  const boards = await axios.get(`${baseURL}/${userId}/user`).then(res => res.data.boards)
  expect(boards.length).toBe(3)
  expect(boards[0].userId).toBe(userId)
  expect(boards[1].userId).toBe(userId)
  expect(boards[2].userId).toBe(userId)
  done()
})

