import { Request, Response } from 'express';
import * as UserServices from '../services/UserServices';

export const checkLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { status, message, data } = await UserServices.getUserById({ email, password });
  if (status >= 400) {
    return res.status(status).json({ message });
  }
  return res.status(200).json(data);
};

export const validate = async (req: Request, res: Response) => {
  const authorization = req.headers.authorization || '';
  const { status, message, data } = await UserServices.getRoleByToken(authorization);
  if (status >= 400) {
    return res.status(status).json({ message });
  }
  return res.status(200).json(data);
};
