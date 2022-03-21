import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import ErrorMessage from '../../utils/ErrorMessage';
import IMatch from '../../interfaces/IMatch';

export const schemeMatch = Joi.object({
  homeTeam: Joi.number().required(),
  awayTeam: Joi.number().required(),
  homeTeamGoals: Joi.number().required(),
  awayTeamGoals: Joi.number().required(),
  inProgress: Joi.boolean().required(),
  authorization: Joi.string().required().messages({
    'string.required': ErrorMessage.INVALID_TOKEN,
    'string.empty': ErrorMessage.INVALID_TOKEN,
  }),
}).strict();

const verifyEqualityOfTeams = (firstTeam: number, secondTeam: number) => {
  const ERROR_MESSAGE = 'It is not possible to create a match with two equal teams';
  return firstTeam === secondTeam ? ERROR_MESSAGE : '';
};

const validateMatch = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
  const authorization = req.headers.authorization || '';
  const match: IMatch = { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress };
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
