import logger from 'loglevel'

import Board from '../models/board'


export const getBoards = async (req, res) => {
  const { userId } = req.params

  if (!userId) {
    return res.status(400).json({ message: 'Server cannot process request' })
  }

  const boards = await Board.find({ userId })
    .catch(err => {
      logger.error(err)
      res.status(500).json({ message: 'Server encountered an internal error' })
    })

  if (boards) return res.status(200).json({ boards: boards.map(board => boardToJson(board)) })

  return res.status(400).json({ message: 'Server cannot process request' })
}

export const getBoard = async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: 'An invalid value was specified for one of the query parameters in the request URI' })
  }

  const board = await Board.findById(id)
    .catch(err => {
      logger.error(err)
      return res.status(400).json({ message: 'Server could not locate resource' })
    })
  if (board) {
    return res.status(200).json(boardToJson(board))
  }

  return res.status(400).json({ message: 'Server could not localte resource' })
}

export const updateBoard = async (req, res) => {
  const { id } = req.body

  if (!id) {
    return res.status(400).json({ message: 'Server cannot process request' })
  }

  const board = await Board.findByIdAndUpdate(id, req.body, { new: true })
    .catch(err => {
      logger.error(err)
      return res.status(400).json({ message: 'Server could not locate resource' })
    })

  return res.status(200).json(boardToJson(board))
}

export const createBoard = async (req, res) => {
  const { name, userId, category } = req.body

  if (!userId) {
    return res.status(400).json({ message: 'One of the request inputs is not valid' })
  }

  const board = await Board.create({ name, userId, category })
    .catch(err => {
      logger.error(err)
      return res.status(500).json({ message: 'Server encountered an internal error while trying to save resource' })
    })

  return res.status(200).json(boardToJson(board))
}

export const deleteBoard = async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: 'An invalid value was specified for one of the query parameters in the request URI' })
  }
  const board = await Board.findByIdAndRemove(id)
    .catch(err => {
      logger.error(err)
      return res.status(400).json({ message: 'Server could not locate resource' })
    })

  return res.status(201).json(boardToJson(board))
}

export function boardToJson(board = {}) {
  const { id, name, userId, category } = board
  return {
    id,
    name,
    userId,
    category,
  }
}
