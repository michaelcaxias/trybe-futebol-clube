import { responseValidate } from '../utils';
import Clubs from '../models/Clubs';
import IResValidate from '../interfaces/IResponseValidate';
import Matchs from '../models/Matchs';
import ILeaderboard from '../interfaces/ILeaderboard';
import Leaderboard from './Leaderboard';

export default class LeaderboardAway extends Leaderboard {
  static async formatLeaderboard(id: number, name: string): Promise<ILeaderboard> {
    const matchsTeam = await Matchs.findAll({ where: { awayTeam: id, inProgress: false } });
    const teamPoints = this.getTeamPoints(matchsTeam, 'awayTeamGoals', 'homeTeamGoals');
    const totalGames = matchsTeam.length;
    const goalsInfo = this.getGoalsInfo(matchsTeam, 'awayTeamGoals', 'homeTeamGoals');
    const efficiency = ((teamPoints.totalPoints / (totalGames * 3)) * 100).toFixed(2);
    return {
      name,
      ...teamPoints,
      ...goalsInfo,
      totalGames,
      efficiency: Number(efficiency),
    };
  }

  static async get(): Promise<IResValidate> {
    const clubs = await Clubs.findAll();

    if (!clubs.length) {
      return responseValidate(404, 'Clubs not found!');
    }

    const formatClubs = await Promise.all(
      clubs.map(async (club) => this.formatLeaderboard(club.id, club.clubName)),
    );

    const sortedClubs = this.sortClubs(formatClubs);

    return responseValidate(200, '', sortedClubs);
  }
}
