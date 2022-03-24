import { responseValidate } from '../utils';
import Clubs from '../models/Clubs';
// import IResValidate from '../interfaces/IResponseValidate';
import Matchs from '../models/Matchs';

export const getHomeTeamPoints = (match: Matchs[]) => {
  let totalPoints = 0;
  let totalVictories = 0;
  let totalDraws = 0;
  let totalLosses = 0;

  if (match.homeTeamGoals > match.awayTeamGoals) {
    totalPoints += 3;
    totalVictories += 1;
  }
  if (match.homeTeamGoals === match.awayTeamGoals) {
    totalDraws += 1;
  } else {
    totalLosses += 1;
  }

  return { totalPoints, totalVictories, totalDraws, totalLosses };
};

const formatLeaderboards = async (id: number, name: string) => {
  const matchTeam = await Matchs.findOne({ where: { homeTeam: id } });
  const teamPoints = getHomeTeamPoints(matchTeam as Matchs);
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
