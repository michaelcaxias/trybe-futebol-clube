import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';

import Users from '../models/Users';
import IResValidate from '../interfaces/IResponseValidate';
import responseValidate from '../utils';

type UserBody = { email: string, password: string };

export const removeLint = '';

export const getUserById = async ({ email }: UserBody): Promise<IResValidate> => {
  const user = await Users.findOne({ where: { email } });

  if (!user) {
    return responseValidate(401, 'Incorrect email or password');
  }

  const jwtSecret = fs.readFileSync('jwt.evaluation.key', 'utf8').trim();
  const token = jwt.sign({ email }, jwtSecret);

  const userResult = {
    id: user.id,
    username: user.username,
    role: user.role,
    email: user.email,
  };

  const responseFormat = {
    user: userResult, token,
  };

  return responseValidate(200, '', responseFormat);
};
