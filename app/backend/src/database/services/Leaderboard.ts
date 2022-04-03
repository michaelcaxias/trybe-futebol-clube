/* eslint-disable max-lines-per-function */
import ILeaderboard from '../interfaces/ILeaderboard';
import Matchs from '../models/Matchs';

type TeamGoals = 'homeTeamGoals' | 'awayTeamGoals';
type FormatLeaderboard = {
  id: number,
  matchsTeam: Matchs[],
  name: string,
  findByHome: boolean,
  findByAway: boolean
};

export default class Leaderboard {
  static formatTeam() {
    return {
      totalPoints: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
    };
  }

  static getTeamPoints(match: Matchs, firstTeamGoals: TeamGoals, secondTeamGoals: TeamGoals) {
    let totalPoints = 0;
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;

    if (match[firstTeamGoals] > match[secondTeamGoals]) {
      totalPoints += 3;
      totalVictories += 1;
    } else if (match[firstTeamGoals] === match[secondTeamGoals]) {
      totalDraws += 1;
      totalPoints += 1;
    } else {
      totalLosses += 1;
    }

    return { totalPoints, totalVictories, totalDraws, totalLosses };
  }

  static getGoalsInfo(match: Matchs, firstTeamGoals: TeamGoals, secondTeamGoals: TeamGoals) {
    let goalsFavor = 0;
    let goalsOwn = 0;
    let goalsBalance = 0;

    goalsFavor += match[firstTeamGoals];
    goalsOwn += match[secondTeamGoals];

    goalsBalance = goalsFavor - goalsOwn;

    return { goalsFavor, goalsOwn, goalsBalance };
  }

  static sortClubs(clubs: ILeaderboard[]) {
    return clubs.sort((teamA, teamB) => (
      teamB.totalPoints - teamA.totalPoints
      || teamB.goalsBalance - teamA.goalsBalance
      || teamB.goalsFavor - teamA.goalsFavor
      || teamA.goalsOwn - teamB.goalsOwn
    ));
  }

  static async format({
    id, matchsTeam, name, findByHome, findByAway,
  }: FormatLeaderboard): Promise<ILeaderboard> {
    let totalPoints = 0;
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;

    let goalsFavor = 0;
    let goalsOwn = 0;
    let goalsBalance = 0;
    let totalGames = 0;
    matchsTeam.forEach((matchTeam) => {
      if (findByHome && matchTeam.homeTeam === id) {
        totalGames += 1;
        const teamPoints = this.getTeamPoints(matchTeam, 'homeTeamGoals', 'awayTeamGoals');
        totalPoints += teamPoints.totalPoints;
        totalVictories += teamPoints.totalVictories;
        totalDraws += teamPoints.totalDraws;
        totalLosses += teamPoints.totalLosses;
        const goalsInfo = this.getGoalsInfo(matchTeam, 'homeTeamGoals', 'awayTeamGoals');
        goalsFavor += goalsInfo.goalsFavor;
        goalsOwn += goalsInfo.goalsOwn;
        goalsBalance += goalsInfo.goalsBalance;
      }
      if (findByAway && matchTeam.awayTeam === id) {
        totalGames += 1;
        const teamPoints = this.getTeamPoints(matchTeam, 'awayTeamGoals', 'homeTeamGoals');
        totalPoints += teamPoints.totalPoints;
        totalVictories += teamPoints.totalVictories;
        totalDraws += teamPoints.totalDraws;
        totalLosses += teamPoints.totalLosses;
        const goalsInfo = this.getGoalsInfo(matchTeam, 'awayTeamGoals', 'homeTeamGoals');
        goalsFavor += goalsInfo.goalsFavor;
        goalsOwn += goalsInfo.goalsOwn;
        goalsBalance += goalsInfo.goalsBalance;
      }
    });
    const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
    return {
      name,
      totalPoints,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      totalGames,
      efficiency: Number(efficiency),
    };
  }
}
