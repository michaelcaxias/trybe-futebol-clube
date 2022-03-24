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

const formatLeaderboards = async (id: number, name: string) => {
  const matchsTeam = await Matchs.findAll({ where: { homeTeam: id } });
  const teamPoints = getHomeTeamPoints(matchsTeam);
  return {
    name,
    ...teamPoints,
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
