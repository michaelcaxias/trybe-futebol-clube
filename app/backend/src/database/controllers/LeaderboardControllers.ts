import { Request, Response } from 'express';
import * as LeaderboardServices from '../services/LeaderboardServices';

export const removeLint = '';

export const getResult = async (_req: Request, res: Response) => {
  const { status, message, data } = await LeaderboardServices.getLeaderboardHome();
  if (status >= 400) {
    return res.status(status).json({ message });
  }
  return res.status(200).json(data);
};
