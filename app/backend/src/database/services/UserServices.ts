import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';

import Users from '../models/Users';
import IResValidate from '../interfaces/IResponseValidate';
import responseValidate from '../utils';

type UserBody = { email: string, password: string };

const getJWTUserByToken = async (decodedJWT: string | jwt.JwtPayload) => {
  if (typeof decodedJWT === 'object') {
    const user = await Users.findOne({ where: { email: decodedJWT.email } });
    return user;
  }
  return '';
};

export const getRoleByToken = async (token: string): Promise<IResValidate> => {
  const jwtSecret = fs.readFileSync('jwt.evaluation.key', 'utf8').trim();
  const verifyToken = jwt.verify(token, jwtSecret);
  const user = await getJWTUserByToken(verifyToken);

  if (!user) {
    return responseValidate(401, 'Incorrect token');
  }

  const { role } = user;
  return responseValidate(200, '', { role });
};

export const getUserById = async ({ email, password }: UserBody): Promise<IResValidate> => {
  const user = await Users.findOne({ where: { email, password } });

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
