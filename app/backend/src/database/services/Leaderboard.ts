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
  static getTeamPoints(matchs: Matchs[], firstTeamGoals: TeamGoals, secondTeamGoals: TeamGoals) {
    let totalPoints = 0;
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;

    matchs.forEach((match) => {
      if (match[firstTeamGoals] > match[secondTeamGoals]) {
        totalPoints += 3;
        totalVictories += 1;
      } else if (match[firstTeamGoals] === match[secondTeamGoals]) {
        totalDraws += 1;
        totalPoints += 1;
      } else {
        totalLosses += 1;
      }
    });

    return { totalPoints, totalVictories, totalDraws, totalLosses };
  }

  static getGoalsInfo(matchs: Matchs[], firstTeamGoals: TeamGoals, secondTeamGoals: TeamGoals) {
    let goalsFavor = 0;
    let goalsOwn = 0;
    let goalsBalance = 0;

    matchs.forEach((match) => {
      goalsFavor += match[firstTeamGoals];
      goalsOwn += match[secondTeamGoals];
    });

    goalsBalance = goalsFavor - goalsOwn;

    return { goalsFavor, goalsOwn, goalsBalance };
  }

  static sortClubs(clubs: ILeaderboard[]) {
    return clubs.sort((a, b) => {
      let sortingTiebreaker = b.totalPoints - a.totalPoints;
      if (sortingTiebreaker === 0) {
        sortingTiebreaker = b.goalsBalance - a.goalsBalance;
        if (sortingTiebreaker === 0) {
          sortingTiebreaker = b.goalsFavor - a.goalsFavor;
          if (sortingTiebreaker === 0) {
            sortingTiebreaker = a.goalsOwn - b.goalsOwn;
          }
        }
      }
      return sortingTiebreaker;
    });
  }

  static async format({
    matchsTeam, name, firstTeamGoals, secondTeamGoals,
  }: FormatLeaderboard): Promise<ILeaderboard> {
    const teamPoints = this.getTeamPoints(matchsTeam, firstTeamGoals, secondTeamGoals);
    const totalGames = matchsTeam.length;
    const goalsInfo = this.getGoalsInfo(matchsTeam, firstTeamGoals, secondTeamGoals);
    const efficiency = ((teamPoints.totalPoints / (totalGames * 3)) * 100).toFixed(2);
    return {
      name,
      ...teamPoints,
      ...goalsInfo,
      totalGames,
      efficiency: Number(efficiency),
    };
  }
}
