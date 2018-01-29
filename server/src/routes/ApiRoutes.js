import { Router } from 'express';
import * as ApiController from '../controller/ApiController';

const router = new Router();

router.get('/test', ApiController.test);

export default router;
