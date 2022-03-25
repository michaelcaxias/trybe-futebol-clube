import { Request, Response } from 'express';
import ClubServices from '../services/ClubServices';

export default class ClubControllers {
  static async getTeams(_req: Request, res: Response) {
    const { status, message, data } = await ClubServices.getTeams();
    if (status >= 400) {
      return res.status(status).json({ message });
    }
    return res.status(200).json(data);
  }

  static async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const convertIdToNumber = Number(id);
    const { status, message, data } = await ClubServices.getTeamById(convertIdToNumber);
    if (status >= 400) {
      return res.status(status).json({ message });
    }
    return res.status(200).json(data);
  }
}
