import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

const notEmptyMessage = 'All fields must be filled';

export const schemeLogin = Joi.object({
  email: Joi.string().email().required().messages({
    'string.required': notEmptyMessage,
    'string.email': 'Incorrect email or password',
    'string.empty': notEmptyMessage,
  }),
  password: Joi.string().required().min(7).messages({
    'string.required': notEmptyMessage,
    'string.empty': notEmptyMessage,
  }),
});

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const { error } = schemeLogin.validate({ email, password });
  if (error) {
    return res.status(401).json({ message: error.message });
  }
  return next();
};

export default validateLogin;
