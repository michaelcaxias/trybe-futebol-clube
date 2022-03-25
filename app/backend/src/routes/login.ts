import { Router } from 'express';
import ValidateLogin from '../database/controllers/middlewares/ValidateLogin';
import * as Login from '../database/controllers/LoginControllers';

const router = Router();

router.post('/', ValidateLogin, Login.checkLogin);
router.get('/validate', Login.validate);

export default router;
