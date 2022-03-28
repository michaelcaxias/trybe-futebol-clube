import { responseValidate } from '../utils';
import Clubs from '../models/Clubs';
import IResValidate from '../interfaces/IResponseValidate';
import Matchs from '../models/Matchs';
import ILeaderboard from '../interfaces/ILeaderboard';
import Leaderboard from './Leaderboard';

export default class LeaderboardAway extends Leaderboard {
  static getTeamPoints(matchs: Matchs[]) {
    let totalPoints = 0;
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;

    matchs.forEach((match) => {
      if (match.awayTeamGoals > match.homeTeamGoals) {
        totalPoints += 3;
        totalVictories += 1;
      } else if (match.awayTeamGoals === match.homeTeamGoals) {
        totalDraws += 1;
        totalPoints += 1;
      } else {
        totalLosses += 1;
      }
    });

    return { totalPoints, totalVictories, totalDraws, totalLosses };
  }

  static getGoalsInfo(matchs: Matchs[]) {
    let goalsFavor = 0;
    let goalsOwn = 0;
    let goalsBalance = 0;

    matchs.forEach((match) => {
      goalsFavor += match.awayTeamGoals;
      goalsOwn += match.homeTeamGoals;
    });

    goalsBalance = goalsFavor - goalsOwn;

    return { goalsFavor, goalsOwn, goalsBalance };
  }

  static async formatLeaderboard(id: number, name: string): Promise<ILeaderboard> {
    const matchsTeam = await Matchs.findAll({ where: { awayTeam: id, inProgress: false } });
    const teamPoints = this.getTeamPoints(matchsTeam);
    const totalGames = matchsTeam.length;
    const goalsInfo = this.getGoalsInfo(matchsTeam);
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

    const sortedClubs = this.sortClubsLeaderboard(formatClubs);

    return responseValidate(200, '', sortedClubs);
  }
}
