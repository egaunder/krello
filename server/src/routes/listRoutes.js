import { Router } from 'express'

import * as ListController from '../controllers/listController'

const router = Router()

/**
 * ListRouter:
 * get: {
 *  route: '/:id',
 *  response: "return List",
 *  data: { ...List }
 * },
 * put: {
 *  route: '/'
 *  body: { id, name },
 *  response: "update List",
 *  data: { ...List }
 * },
 * post: {
 *  route: '/',
 *  body: { name, userId, category },
 *  response: "create new List",
 *  data: { ...List }
 * },
 * delete: {
 *  route: '/:id',
 *  response:  "return List that was deleted",
 *  data: { ...List },
 * },
 */

router.route('/:id')
  .get(ListController.getList)
  .delete(ListController.deleteList)

router.route('/')
  .post(ListController.createList)
  .put(ListController.updateList)

export default router
