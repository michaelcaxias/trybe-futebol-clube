import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as MatchServices from '../services/MatchsServices';

export const getMatchs = async (req: Request, res: Response, next: NextFunction) => {
  const { status, message, data } = await MatchServices.getMatchs();
  const { inProgress } = req.query;
  if (inProgress) {
    return next();
  }
  if (status >= 400) {
    return res.status(status).json({ message });
  }
  return res.status(200).json(data);
};

export const getMatchsByProgress = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  const convertInProgressToBoolean = inProgress === 'true';
  fs.writeFileSync('text.txt', String(inProgress), 'utf-8');
  const {
    status, message, data,
  } = await MatchServices.getMatchsByProgress(convertInProgressToBoolean);

  if (status >= 400) {
    return res.status(status).json({ message });
  }
  return res.status(200).json(data);
};
