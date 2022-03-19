import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

export const schemeClub = Joi.object({ id: Joi.number().required() });

const validateId = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { error } = schemeClub.validate({ id });
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  return next();
};

export default validateId;
