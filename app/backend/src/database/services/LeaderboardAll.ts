/* eslint-disable max-lines-per-function */
import { responseValidate } from '../utils';
import Clubs from '../models/Clubs';
import Leaderboard from './Leaderboard';
import Matchs from '../models/Matchs';

type GetParameters = { findByHome: boolean, findByAway: boolean };

export default class LeaderboardAll extends Leaderboard {
  static async get({ findByHome, findByAway }: GetParameters) {
    const clubs = await Clubs.findAll();

    if (!clubs.length) {
      return responseValidate(404, 'Clubs not found!');
    }

    const formatClubs = await Promise.all(
      clubs.map(async (club) => {
        const matchsTeam = await Matchs.findAll({ where: { inProgress: false },
        });

        return this.format({
          id: club.id,
          matchsTeam,
          name: club.clubName,
          findByHome,
          findByAway,
        });
      }),
    );

    const sortedClubs = this.sortClubs(formatClubs);

    return responseValidate(200, '', sortedClubs);
  }
}
