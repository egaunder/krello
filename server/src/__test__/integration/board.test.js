import axios from 'axios'
import faker from 'faker'
import getPort from 'get-port'

import startServer from '../../start'
import Board from '../../models/board'

let server
let baseURL

beforeAll(async () => {
  const port = await getPort()
  server = await startServer({ port })
  baseURL = `http://localhost:${server.address().port}/api/boards`
})

afterAll(async () => {
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

  Board.findByIdAndRemove(getBoard.id)

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
  expect(boards[0].userId).toBe(userId)
  expect(boards[1].userId).toBe(userId)
  expect(boards[2].userId).toBe(userId)

  Board.findByIdAndRemove(boards[0].id)
  Board.findByIdAndRemove(boards[1].id)
  Board.findByIdAndRemove(boards[2].id)

  done()
})

test('create board', async done => {
  const board = {
    name: faker.name.findName(),
    userId: 'j12k',
    category: 'Studies',
  }

  const savedBoard = await axios.post(baseURL, board).then(res => res.data)
  const getBoard = await axios.get(`${baseURL}/${savedBoard.id}`).then(res => res.data)

  expect(getBoard.name).toBe(board.name)
  expect(getBoard.userId).toBe(board.userId)
  expect(getBoard.category).toBe(board.category)

  Board.findByIdAndRemove(getBoard.id)

  done()
})

test('update board', async done => {
  const updateBoard = {
    name: faker.name.findName(),
    userId: 'sfjl32j4k',
    category: 'Studies',
  }
  const board = await axios.post(baseURL, updateBoard).then(res => res.data)
  const getBoard = await axios.put(baseURL, { id: board.id, name: 'John' }).then(res => res.data)

  expect(getBoard.name).toBe('John')
  done()
})

test('delete board', async done => {
  const board = {
    name: 'Elvan',
    userId: 'jfkslfjksldjflsd',
    category: 'Studies',
  }

  const postBoard = await axios.post(baseURL, board).then(res => res.data)
  const deletedBoard = await axios.delete(`${baseURL}/${postBoard.id}`).then(res => res.data)
  expect(deletedBoard.name).toBe(board.name)
  expect(deletedBoard.userId).toBe(board.userId)
  done()
})

