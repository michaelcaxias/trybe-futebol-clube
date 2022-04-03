import { Router } from 'express';
import Leaderboard from '../database/controllers/LeaderboardControllers';

const router = Router();

router.get('/', Leaderboard.getAll);
router.get('/home', Leaderboard.getHome);
router.get('/away', Leaderboard.getAway);

export default router;
