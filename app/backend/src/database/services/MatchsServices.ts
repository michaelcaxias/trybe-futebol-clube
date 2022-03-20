import responseValidate from '../utils';
import IResValidate from '../interfaces/IResponseValidate';
import Matchs from '../models/Matchs';

export const removeLint = '';

export const getMatchs = async (): Promise<IResValidate> => {
  const matchs = await Matchs.findAll();

  if (!matchs.length) {
    return responseValidate(404, 'Could not find any Matchs');
  }

  return responseValidate(200, '', matchs);
};

export const getMatchsByProgress = async (progress: number): Promise<IResValidate> => {
  const matchs = await Matchs.findAll({ where: { inProgress: progress } });

  if (!matchs.length) {
    return responseValidate(404, 'Could not find any Matchs');
  }

  return responseValidate(200, '', matchs);
};
