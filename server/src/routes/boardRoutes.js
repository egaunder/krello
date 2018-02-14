import { Router } from 'express';
import logger from 'loglevel';
import { ommit } from 'lodash';

import Board from '../models/board';

const boardRouter = Router();

/**
 * BoardRouter:
 * get: {
 *  route: '/:userId',
 *  response: "return all boards belonging to user",
 *  data: [{ ...board }, { ...board }, { ...board }]
 * },
 * put: {
 *  route: '/'
 *  body: { id, name, userId, category },
 *  response: "update board",
 *  data: { ...board }
 * },
 * post: {
 *  route: '/',
 *  body: { id, name, userId, category },
 *  response: "create new board",
 *  data: { ...board }
 * },
 * delete: {
 *  route: '/:id',
 *  response:  "return board that was deleted",
 *  data: { ...board },
 * },
 */

function boardToJson({ id, name, userId, category, otherBoardProps }) {
  return {
    id,
    name,
    userId,
    category,
    ...ommit(otherBoardProps, ['created_at', 'updated_at']),
  };
}

boardRouter.route('/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: 'Server cannot process request' });
  }

  const boards = await Board.find({ userId })
    .catch((err) => {
      logger.error(err);
      res.status(500).json({ message: 'Server encountered an internal error' });
    });

  if (boards) return res.status(200).json({ boards });

  return res.status(400).json({ message: 'Server cannot process request' });
});

// boardRouter.route('/:userId', async (req, res) => {

// })

export default boardRouter;
