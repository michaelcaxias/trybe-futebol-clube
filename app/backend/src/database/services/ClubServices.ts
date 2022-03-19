import responseValidate from '../utils';
import Clubs from '../models/Clubs';
import IResValidate from '../interfaces/IResponseValidate';

export const removeLint = '';

export const getTeams = async (): Promise<IResValidate> => {
  const teams = await Clubs.findAll();

  if (!teams) {
    return responseValidate(401, 'Could not find any Teams');
  }

  return responseValidate(200, '', teams);
};
