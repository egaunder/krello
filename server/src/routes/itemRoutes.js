import { Router } from 'express'

import * as ItemController from '../controllers/itemController'

const router = Router()

router.route('/:id')
  .get(ItemController.getItem)
  .delete(ItemController.deleteItem)

router.route('/')
  .post(ItemController.createItem)
  .put(ItemController.updateItem)

export default router
