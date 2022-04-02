/* eslint-disable max-lines-per-function */
import ILeaderboard from '../interfaces/ILeaderboard';
import Matchs from '../models/Matchs';

type TeamGoals = 'homeTeamGoals' | 'awayTeamGoals';
type FormatLeaderboard = {
  matchsTeam: Matchs[],
  name: string,
  firstTeamGoals: TeamGoals,
  secondTeamGoals: TeamGoals
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
    matchsTeam, name, firstTeamGoals, secondTeamGoals,
  }: FormatLeaderboard): Promise<ILeaderboard> {
    let totalPoints = 0;
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;
    let goalsFavor = 0;
    let goalsOwn = 0;
    let goalsBalance = 0;
    matchsTeam.forEach((matchTeam) => {
      const teamPoints = this.getTeamPoints(matchTeam, firstTeamGoals, secondTeamGoals);
      totalPoints += teamPoints.totalPoints;
      totalVictories += teamPoints.totalVictories;
      totalDraws += teamPoints.totalDraws;
      totalLosses += teamPoints.totalLosses;
      const goalsInfo = this.getGoalsInfo(matchTeam, firstTeamGoals, secondTeamGoals);
      goalsFavor += goalsInfo.goalsFavor;
      goalsOwn += goalsInfo.goalsOwn;
      goalsBalance += goalsInfo.goalsBalance;
    });
    const totalGames = matchsTeam.length;
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
