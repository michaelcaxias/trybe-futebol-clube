import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

export const schemeLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const { error } = schemeLogin.validate({ email, password });
    if (error) {
      res.status(400).json({ message: error.message });
    }
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};

export default validateLogin;
