import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import ErrorMessage from '../../utils/ErrorMessage';

export const schemeMatch = Joi.object({
  homeTeam: Joi.required(),
  awayTeam: Joi.required(),
  authorization: Joi.string().required().messages({
    'string.required': ErrorMessage.INVALID_TOKEN,
    'string.empty': ErrorMessage.INVALID_TOKEN,
  }),
}).strict();

const verifyEqualityOfTeams = (firstTeam: number, secondTeam: number) => (
  firstTeam === secondTeam ? ErrorMessage.TEAMS_CONFLIT : ''
);

type MatchJoi = { homeTeam: number | string, awayTeam: number | string };

const validateMatch = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
  if (!awayTeamGoals || !homeTeamGoals || !inProgress) {
    return res.status(401).json({ message: ErrorMessage.NO_ID });
  }
  const authorization = req.headers.authorization || '';
  const match: MatchJoi = { homeTeam, awayTeam };
  const { error } = schemeMatch.validate({ ...match, authorization });
  if (error) {
    return res.status(401).json({ message: error.message });
  }
  const verifyEquality = verifyEqualityOfTeams(homeTeam, awayTeam);
  if (verifyEquality) {
    return res.status(401).json({ message: verifyEquality });
  }
  return next();
};

export default validateMatch;
