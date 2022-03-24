import { responseValidate } from '../utils';
import Clubs from '../models/Clubs';
import IResValidate from '../interfaces/IResponseValidate';
import Matchs from '../models/Matchs';
import ILeaderboard from '../interfaces/ILeaderboard';

export const getHomeTeamPoints = (matchs: Matchs[]) => {
  let totalPoints = 0;
  let totalVictories = 0;
  let totalDraws = 0;
  let totalLosses = 0;

  matchs.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      totalPoints += 3;
      totalVictories += 1;
    } else if (match.homeTeamGoals === match.awayTeamGoals) {
      totalDraws += 1;
      totalPoints += 1;
    } else {
      totalLosses += 1;
    }
  });

  return { totalPoints, totalVictories, totalDraws, totalLosses };
};

export const getHomeGoalsInfo = (matchs: Matchs[]) => {
  let goalsFavor = 0;
  let goalsOwn = 0;
  let goalsBalance = 0;

  matchs.forEach((match) => {
    goalsFavor += match.homeTeamGoals;
    goalsOwn += match.awayTeamGoals;
  });

  goalsBalance = goalsFavor - goalsOwn;

  return { goalsFavor, goalsOwn, goalsBalance };
};

const formatLeaderboards = async (id: number, name: string): Promise<ILeaderboard> => {
  const matchsTeam = await Matchs.findAll({ where: { homeTeam: id, inProgress: false } });
  const teamPoints = getHomeTeamPoints(matchsTeam);
  const totalGames = matchsTeam.length;
  const goalsInfo = getHomeGoalsInfo(matchsTeam);
  const efficiency = Number(((teamPoints.totalPoints / totalGames) * 100).toFixed(2));
  return {
    name,
    ...teamPoints,
    ...goalsInfo,
    totalGames,
    efficiency,
  };
};

const sortClubsLeaderboard = (clubs: ILeaderboard[]) => (
  clubs.sort((a, b) => b.totalPoints - a.totalPoints)
);

export const getAllLeaderboards = async (): Promise<IResValidate> => {
  const clubs = await Clubs.findAll();

  if (!clubs.length) {
    return responseValidate(404, 'Clubs not found!');
  }

  const formatClubs = await Promise.all(
    clubs.map(async (club) => formatLeaderboards(club.id, club.clubName)),
  );

  const sortedClubs = sortClubsLeaderboard(formatClubs);

  return responseValidate(200, '', sortedClubs);
};
