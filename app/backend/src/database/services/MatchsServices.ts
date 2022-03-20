import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { responseValidate, getJWTUserByToken } from '../utils';
import IResValidate from '../interfaces/IResponseValidate';
import Matchs from '../models/Matchs';
import Clubs from '../models/Clubs';
import IMatch from '../interfaces/IMatch';
import ErrorMessage from '../utils/ErrorMessage';

export const getMatchs = async (): Promise<IResValidate> => {
  const matchs = await Matchs.findAll({
    include: [
      { model: Clubs, as: 'homeClub', attributes: { exclude: ['id'] } },
      { model: Clubs, as: 'awayClub', attributes: { exclude: ['id'] } },
    ],
  });

  if (!matchs.length) {
    return responseValidate(404, 'Could not find any Matchs');
  }

  return responseValidate(200, '', matchs);
};

export const getMatchsByProgress = async (inProgress: boolean): Promise<IResValidate> => {
  const matchs = await Matchs.findAll({
    where: { inProgress },
    include: [
      { model: Clubs, as: 'homeClub', attributes: { exclude: ['id'] } },
      { model: Clubs, as: 'awayClub', attributes: { exclude: ['id'] } },
    ],
  });

  if (!matchs.length) {
    return responseValidate(404, 'Could not find any Matchs');
  }

  return responseValidate(200, '', matchs);
};

export const postMatch = async (newMatch: IMatch, token: string): Promise<IResValidate> => {
  const jwtSecret = fs.readFileSync('jwt.evaluation.key', 'utf8').trim();
  const verifyToken = jwt.verify(token, jwtSecret);
  const user = await getJWTUserByToken(verifyToken);

  if (!user) {
    return responseValidate(401, ErrorMessage.INVALID_TOKEN);
  }

  const createNewGame = await Matchs.create(newMatch);

  if (!createNewGame) {
    return responseValidate(400, 'Could not create the match specified');
  }
  return responseValidate(200, '', createNewGame);
};
