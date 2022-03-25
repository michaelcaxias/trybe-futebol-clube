import { Router } from 'express';
import validateId from '../database/controllers/middlewares/ValidateClub';
import Club from '../database/controllers/ClubControllers';

const router = Router();

router.get('/', Club.getTeams);
router.get('/:id', validateId, Club.getTeamById);

export default router;
