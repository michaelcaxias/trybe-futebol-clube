import { Request, Response, NextFunction } from 'express';
import * as MatchServices from '../services/MatchsServices';
import IMatch from '../interfaces/IMatch';

export const getMatchs = async (req: Request, res: Response, next: NextFunction) => {
  const { status, message, data } = await MatchServices.getMatchs();
  const { inProgress } = req.query;
  if (inProgress) {
    return next();
  }
  if (status >= 400) {
    return res.status(status).json({ message });
  }
  return res.status(status).json(data);
};

export const getMatchsByProgress = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  const convertInProgressToBoolean = inProgress === 'true';
  const {
    status, message, data,
  } = await MatchServices.getMatchsByProgress(convertInProgressToBoolean);

  if (status >= 400) {
    return res.status(status).json({ message });
  }
  return res.status(status).json(data);
};

export const postMatch = async (req: Request, res: Response) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
  const authorization = req.headers.authorization || '';
  const match: IMatch = { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress };
  const { status, message, data } = await MatchServices.postMatch(match, authorization);
  if (status >= 400) {
    return res.status(status).json({ message });
  }
  return res.status(status).json(data);
};

export const editMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const { status, message, data } = await MatchServices.editMatch({
    id: Number(id), homeTeamGoals, awayTeamGoals,
  });
  if (status >= 400) {
    return res.status(status).json({ message });
  }
  return res.status(status).json(data);
};

export const finishMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, message, data } = await MatchServices.finishMatch(Number(id));
  if (status >= 400) {
    return res.status(status).json({ message });
  }
  return res.status(status).json(data);
};
