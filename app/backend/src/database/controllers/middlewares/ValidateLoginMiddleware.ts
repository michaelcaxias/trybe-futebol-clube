import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

export const schemeLogin = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const checkLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  const { error } = schemeLogin.validate({ username, password });
  if (error) {
    res.status(400).json({ message: error.message });
  }
  next();
};
