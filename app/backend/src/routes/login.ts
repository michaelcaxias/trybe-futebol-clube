import { Router } from 'express';
import ValidateLogin from '../database/controllers/middlewares/ValidateLogin';
import User from '../database/controllers/UserControllers';

const router = Router();

router.post('/', ValidateLogin, User.login);
router.get('/validate', User.validate);

export default router;
