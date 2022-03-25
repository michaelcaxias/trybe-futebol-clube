import { responseValidate } from '../utils';
import Clubs from '../models/Clubs';
import IResValidate from '../interfaces/IResponseValidate';

export default class ClubServices {
  static async getTeams(): Promise<IResValidate> {
    const teams = await Clubs.findAll();

    if (!teams.length) {
      return responseValidate(404, 'Could not find any Teams');
    }

    return responseValidate(200, '', teams);
  }

  static async getTeamById(id: number): Promise<IResValidate> {
    const team = await Clubs.findOne({ where: { id } });

    if (!team) {
      return responseValidate(404, 'Could not find a Team with this id');
    }

    return responseValidate(200, '', team);
  }
}
