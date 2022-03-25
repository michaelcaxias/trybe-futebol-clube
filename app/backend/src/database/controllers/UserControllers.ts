import { Request, Response } from 'express';
import * as UserServices from '../services/UserServices';

export default class User {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, message, data } = await UserServices.getUser({ email, password });
    if (status >= 400) {
      return res.status(status).json({ message });
    }
    return res.status(200).json(data);
  }

  static async validate(req: Request, res: Response) {
    const authorization = req.headers.authorization || '';
    const { status, message, data } = await UserServices.getRoleByToken(authorization);
    if (status >= 400) {
      return res.status(status).json({ message });
    }
    return res.status(200).json(data);
  }
}
