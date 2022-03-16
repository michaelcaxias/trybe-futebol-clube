import { Request, Response } from 'express';
import * as Joi from 'joi';

export const schemeLogin = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const checkLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  return res.status(200).json({ username, password });
};
