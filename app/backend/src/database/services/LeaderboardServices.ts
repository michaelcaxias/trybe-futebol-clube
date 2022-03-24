import { responseValidate } from '../utils';
import Clubs from '../models/Clubs';
// import IResValidate from '../interfaces/IResponseValidate';
import Matchs from '../models/Matchs';

export const getHomeTeamPoints = (matchs: Matchs[]) => {
  let totalPoints = 0;
  let totalVictories = 0;
  let totalDraws = 0;
  let totalLosses = 0;

  matchs.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      totalPoints += 3;
      totalVictories += 1;
    }
    if (match.homeTeamGoals === match.awayTeamGoals) {
      totalDraws += 1;
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

const formatLeaderboards = async (id: number, name: string) => {
  const matchsTeam = await Matchs.findAll({ where: { homeTeam: id, inProgress: false } });
  const teamPoints = getHomeTeamPoints(matchsTeam);
  const totalGames = matchsTeam.length;
  const goalsInfo = getHomeGoalsInfo(matchsTeam);
  return {
    name,
    ...teamPoints,
    ...goalsInfo,
    totalGames,
  };
};

export const getAllLeaderboards = async () => {
  const clubs = await Clubs.findAll();

  if (!clubs.length) {
    return responseValidate(404, 'Clubs not found!');
  }

  const formatClubs = await Promise.all(
    clubs.map(async (club) => formatLeaderboards(club.id, club.clubName)),
  );
  return responseValidate(200, '', formatClubs);
};
