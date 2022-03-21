import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import ErrorMessage from '../../utils/ErrorMessage';

export const schemeLogin = Joi.object({
  email: Joi.string().email().required().messages({
    'string.required': ErrorMessage.NOT_EMPTY,
    'string.email': ErrorMessage.INCORRECT_LOGIN,
    'string.empty': ErrorMessage.NOT_EMPTY,
  }),
  password: Joi.string().required().min(7).messages({
    'string.required': ErrorMessage.NOT_EMPTY,
    'string.empty': ErrorMessage.NOT_EMPTY,
  }),
});

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ message: ErrorMessage.NOT_EMPTY });
  }
  const { error } = schemeLogin.validate({ email, password });
  if (error) {
    return res.status(401).json({ message: error.message });
  }
  return next();
};

export default validateLogin;
