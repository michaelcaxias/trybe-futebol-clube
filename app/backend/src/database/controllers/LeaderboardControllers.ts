import { Request, Response } from 'express';
import LeaderboardServices from '../services/LeaderboardServices';

export default class LeaderboardControllers {
  static async getResult(_req: Request, res: Response) {
    const { status, message, data } = await LeaderboardServices.getLeaderboardHome();
    if (status >= 400) {
      return res.status(status).json({ message });
    }
    return res.status(200).json(data);
  }
}
