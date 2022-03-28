import { responseValidate } from '../utils';
import Clubs from '../models/Clubs';
import IResValidate from '../interfaces/IResponseValidate';
import Leaderboard from './Leaderboard';
import Matchs from '../models/Matchs';

export default class LeaderboardHome extends Leaderboard {
  static async get(): Promise<IResValidate> {
    const clubs = await Clubs.findAll();

    if (!clubs.length) {
      return responseValidate(404, 'Clubs not found!');
    }

    const formatClubs = await Promise.all(
      clubs.map(async (club) => {
        const matchsTeam = await Matchs.findAll({ where: { homeTeam: club.id, inProgress: false },
        });

        return this.format({
          matchsTeam,
          name: club.clubName,
          firstTeamGoals: 'homeTeamGoals',
          secondTeamGoals: 'awayTeamGoals',
        });
      }),
    );

    const sortedClubs = this.sortClubs(formatClubs);

    return responseValidate(200, '', sortedClubs);
  }
}
