import Router from 'express'

import * as AuthController from '../controllers/authController'

const router = Router()

router.route('/signup').post(AuthController.signup)
router.route('/login').post(AuthController.login)

export default router
