import { Router } from 'express';
import validateMatch from '../database/controllers/middlewares/ValidateMatch';
import * as Match from '../database/controllers/MatchsControllers';

const router = Router();

router.get('/', Match.getMatchs, Match.getMatchsByProgress);
router.post('/', validateMatch, Match.postMatch);
router.patch('/:id', Match.editMatch);
router.patch('/:id/finish', Match.finishMatch);

export default router;
