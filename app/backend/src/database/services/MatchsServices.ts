import responseValidate from '../utils';
import IResValidate from '../interfaces/IResponseValidate';
import Matchs from '../models/Matchs';
import Clubs from '../models/Clubs';

export const getMatchs = async (): Promise<IResValidate> => {
  const matchs = await Matchs.findAll({
    include: [
      { model: Clubs, as: 'homeClub' },
      { model: Clubs, as: 'awayClub' },
    ],
  });

  if (!matchs.length) {
    return responseValidate(404, 'Could not find any Matchs');
  }

  return responseValidate(200, '', matchs);
};

export const getMatchsByProgress = async (progress: boolean): Promise<IResValidate> => {
  const matchs = await Matchs.findAll({ where: { inProgress: progress } });

  if (!matchs.length) {
    return responseValidate(404, 'Could not find any Matchs');
  }

  return responseValidate(200, '', matchs);
};
