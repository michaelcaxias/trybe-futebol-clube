import { Request, Response } from 'express';

export const reoveLintWarn = '';

export const checkLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  return res.status(200).json({ username, password });
};
