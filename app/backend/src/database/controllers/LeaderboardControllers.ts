import { Request, Response } from 'express';
import LeaderboardAll from '../services/LeaderboardAll';

export default class LeaderboardControllers {
  static async getHome(_req: Request, res: Response) {
    const { status, message, data } = await LeaderboardAll.get({
      findByHome: true, findByAway: false,
    });
    if (status >= 400) {
      return res.status(status).json({ message });
    }
    return res.status(200).json(data);
  }

  static async getAway(_req: Request, res: Response) {
    const { status, message, data } = await LeaderboardAll.get({
      findByHome: false, findByAway: true,
    });
    if (status >= 400) {
      return res.status(status).json({ message });
    }
    return res.status(200).json(data);
  }

  static async getAll(_req: Request, res: Response) {
    const { status, message, data } = await LeaderboardAll.get({
      findByHome: true, findByAway: true,
    });
    if (status >= 400) {
      return res.status(status).json({ message });
    }
    return res.status(200).json(data);
  }
}
