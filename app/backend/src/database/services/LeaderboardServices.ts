import { responseValidate } from '../utils';
import Clubs from '../models/Clubs';
import IResValidate from '../interfaces/IResponseValidate';
import Matchs from '../models/Matchs';

export const removeLint = '';

export const getResult = async (): Promise<IResValidate> => {
  const matchs = await Matchs.findAll({
    include: [
      { model: Clubs, as: 'homeClub', attributes: { exclude: ['id'] } },
      { model: Clubs, as: 'awayClub', attributes: { exclude: ['id'] } },
    ],
  });

  if (!matchs.length) {
    return responseValidate(404, 'Could not find any Teams');
  }

  return responseValidate(200, '', matchs);
};
