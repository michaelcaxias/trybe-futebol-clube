import responseValidate from '../utils';
import IResValidate from '../interfaces/IResponseValidate';
import Matchs from '../models/Matchs';
import Clubs from '../models/Clubs';

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
