import { Request, Response } from 'express';
import LeaderboardHome from '../services/LeaderboardHome';
import LeaderboardAway from '../services/LeaderboardAway';

export default class LeaderboardControllers {
  static async getHome(_req: Request, res: Response) {
    const { status, message, data } = await LeaderboardHome.get();
    if (status >= 400) {
      return res.status(status).json({ message });
    }
    return res.status(200).json(data);
  }

  static async getAway(_req: Request, res: Response) {
    const { status, message, data } = await LeaderboardAway.get();
    if (status >= 400) {
      return res.status(status).json({ message });
    }
    return res.status(200).json(data);
  }
}
