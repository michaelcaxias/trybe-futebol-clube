import responseValidate from '../utils';
import Clubs from '../models/Clubs';
import IResValidate from '../interfaces/IResponseValidate';

export const removeLint = '';

export const getTeams = async (): Promise<IResValidate> => {
  const teams = await Clubs.findAll();

  if (!teams.length) {
    return responseValidate(404, 'Could not find any Teams');
  }

  return responseValidate(200, '', teams);
};

export const getTeamById = async (id: number): Promise<IResValidate> => {
  const team = await Clubs.findOne({ where: { id } });

  if (!team) {
    return responseValidate(404, 'Could not find a Team with this id');
  }

  return responseValidate(200, '', team);
};
