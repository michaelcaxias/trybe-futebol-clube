import { Request, Response } from 'express';
import * as MatchServices from '../services/MatchsServices';

export const removeLint = '';

export const getMatchs = async (_req: Request, res: Response) => {
  const { status, message, data } = await MatchServices.getMatchs();
  if (status >= 400) {
    return res.status(status).json({ message });
  }
  return res.status(200).json(data);
};
