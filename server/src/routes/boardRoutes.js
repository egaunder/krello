import { Router } from 'express'
import * as BoardController from '../controllers/BoardController'

const boardRouter = Router()
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

boardRouter.route('/:userId').get(BoardController.getBoards)

boardRouter.route('/:boardId')
  .delete(BoardController.deleteBoard)

boardRouter.route('/').post(BoardController.createBoard)
  .put(BoardController.updateBoard)

export default boardRouter
