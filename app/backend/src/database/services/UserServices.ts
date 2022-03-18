import Users from '../models/Users';
import IResValidate from '../interfaces/IResponseValidate';
import responseValidate from '../utils';

type UserBody = { email: string, password: string };

export const removeLint = '';

export const getUserById = async ({ email, password }: UserBody): Promise<IResValidate> => {
  const findUser = await Users.findOne({ where: { email, password } }) || {};
  return responseValidate(200, '', findUser);
};
