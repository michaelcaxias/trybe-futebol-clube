import { responseValidate, verifyJWT } from '../utils';
import IResValidate from '../interfaces/IResponseValidate';
import Matchs from '../models/Matchs';
import Clubs from '../models/Clubs';
import IMatch from '../interfaces/IMatch';
import ErrorMessage from '../utils/ErrorMessage';

export const getMatchs = async (): Promise<IResValidate> => {
  const matchs = await Matchs.findAll({
    include: [
      { model: Clubs, as: 'homeClub', attributes: { exclude: ['id'] } },
      { model: Clubs, as: 'awayClub', attributes: { exclude: ['id'] } },
    ],
  });

  if (!matchs.length) {
    return responseValidate(404, 'Could not find any Matchs');
  }

  return responseValidate(200, '', matchs);
};

export const getMatchsByProgress = async (inProgress: boolean): Promise<IResValidate> => {
  const matchs = await Matchs.findAll({
    where: { inProgress },
    include: [
      { model: Clubs, as: 'homeClub', attributes: { exclude: ['id'] } },
      { model: Clubs, as: 'awayClub', attributes: { exclude: ['id'] } },
    ],
  });

  if (!matchs.length) {
    return responseValidate(404, 'Could not find any Matchs');
  }

  return responseValidate(200, '', matchs);
};

export const postMatch = async (newMatch: IMatch, token: string): Promise<IResValidate> => {
  try {
    const user = await verifyJWT(token);

    if (!user) { return responseValidate(401, ErrorMessage.INVALID_TOKEN); }

    const [getHomeTeam, getAwayTeam] = await Promise.all([
      Clubs.findOne({ where: { id: newMatch.homeTeam } }),
      Clubs.findOne({ where: { id: newMatch.awayTeam } }),
    ]);

    if (!getHomeTeam || !getAwayTeam) {
      return responseValidate(401, 'There is no team with such id!');
    }

    const createNewGame = await Matchs.create(newMatch);

    if (!createNewGame) { return responseValidate(400, 'Could not create the match specified'); }

    return responseValidate(201, '', createNewGame);
  } catch (error) { return responseValidate(401, ErrorMessage.INVALID_TOKEN); }
};

type EditMatch = { id: number, homeTeamGoals: string, awayTeamGoals: string };

export const editMatch = async ({ id, homeTeamGoals, awayTeamGoals }: EditMatch) => {
  const match = await Matchs.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  if (!match) {
    return responseValidate(404, 'Match not found');
  }
  return responseValidate(200, '', { success: 'Match edited successfully' });
};

export const finishMatch = async (id: number) => {
  const match = await Matchs.update({ inProgress: false }, { where: { id } });
  if (!match) {
    return responseValidate(404, 'Match not found');
  }
  return responseValidate(200, '', { success: 'Match finished successfully' });
};
