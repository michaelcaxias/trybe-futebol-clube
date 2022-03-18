import { Request, Response } from 'express';

export const reoveLintWarn = '';

export const checkLogin = async (req: Request, res: Response) => {
  const { username } = req.body;
  const data = {
    user: {
      id: 1,
      username,
      role: 'admin',
      email: 'admin@admin.com',
    },
    token: '123.456.789',
  };
  return res.status(200).json(data);
};
