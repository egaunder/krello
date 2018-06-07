import { Router } from 'express'
import * as TestController from '../controllers/testController'

const router = Router()

router.route('/numbers').get(TestController.pagination)

export default router
