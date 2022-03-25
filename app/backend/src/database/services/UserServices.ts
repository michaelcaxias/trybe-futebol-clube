import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import * as bcryptjs from 'bcryptjs';

import Users from '../models/Users';
import IResValidate from '../interfaces/IResponseValidate';
import { responseValidate, verifyJWT } from '../utils';
import ErrorMessage from '../utils/ErrorMessage';

type UserBody = { email: string, password: string };

export const getRoleByToken = async (token: string): Promise<IResValidate> => {
  try {
    const user = await verifyJWT(token);

    if (!user) {
      return responseValidate(401, ErrorMessage.INVALID_TOKEN);
    }

    const { role } = user;
    return responseValidate(200, '', role);
  } catch (error) {
    return responseValidate(401, ErrorMessage.INVALID_TOKEN);
  }
};

export const getUser = async ({ email, password }: UserBody): Promise<IResValidate> => {
  const user = await Users.findOne({ where: { email } });

  if (!user) { return responseValidate(401, ErrorMessage.INCORRECT_LOGIN); }

  const compareCrypt = await bcryptjs.compare(password, user.password);

  if (!compareCrypt) { return responseValidate(401, ErrorMessage.INCORRECT_LOGIN); }

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
