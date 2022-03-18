import { Request, Response } from 'express';

export const reoveLintWarn = '';

export const checkLogin = async (req: Request, res: Response) => {
  const { email } = req.body;
  const data = {
    user: {
      id: 1,
      username: 'Admin',
      role: 'admin',
      email,
    },
    token: '123.456.789',
  };
  return res.status(200).json(data);
};
