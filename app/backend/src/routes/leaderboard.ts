import { Router } from 'express';
import Leaderboard from '../database/controllers/LeaderboardControllers';

const router = Router();

router.get('/home', Leaderboard.getResult);

export default router;
