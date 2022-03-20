import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import IResValidate from '../interfaces/IResponseValidate';
import Users from '../models/Users';

export const responseValidate = (status: number, message: string, data = {}): IResValidate => ({
  status,
  message,
  data,
});

export const getJWTUserByToken = async (decodedJWT: string | jwt.JwtPayload) => {
  if (typeof decodedJWT === 'object') {
    const user = await Users.findOne({ where: { email: decodedJWT.email } });
    return user;
  }
  return '';
};

export const verifyJWT = async (token: string) => {
  const jwtSecret = fs.readFileSync('jwt.evaluation.key', 'utf8').trim();
  const verifyToken = jwt.verify(token, jwtSecret);
  const user = await getJWTUserByToken(verifyToken);
  return user;
};
