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

  if (boards) return res.status(200).json({ boards: boardToJson(boards) })

  return res.status(400).json({ message: 'Server cannot process request' })
}

export const updateBoard = async (req, res) => {
  const { boardId } = req.params

  if (!boardId) {
    return res.status(400).json({ message: 'Server cannot process request' })
  }

  const board = await Board.findOne({ id: boardId })
    .catch(err => {
      logger.error(err);
      res.status(500).json({ message: 'Server encountered an internal error' })
    })
  return res.json({ message: 'update' })
}

export const createBoard = async (req, res) => {
  return res.json({ message: 'create' })
}

export const deleteBoard = async (req, res) => {
  return res.json({ message: 'delete' })
}

function boardToJson(board) {
  const { id, name, userId, category } = board
  return {
    id,
    name,
    userId,
    category,
  }
}
