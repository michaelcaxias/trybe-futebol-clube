import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';

import Users from '../models/Users';
import IResValidate from '../interfaces/IResponseValidate';
import responseValidate from '../utils';

type UserBody = { email: string, password: string };

export const removeLint = '';

export const getUserById = async ({ email, password }: UserBody): Promise<IResValidate> => {
  const user = await Users.findOne({ where: { email, password } }) || {};

  if (!user) {
    return responseValidate(401, 'Incorrect email or password');
  }

  const jwtSecret = fs.readFileSync('jwt.evaluation.key', 'utf8');
  const token = jwt.sign(user, jwtSecret);

  const responseFormat = {
    user: { ...user }, token,
  };

  return responseValidate(200, '', responseFormat);
};
