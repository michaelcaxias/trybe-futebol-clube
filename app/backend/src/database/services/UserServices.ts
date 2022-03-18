import Users from '../models/Users';

export const removeLint = '';

type UserBody = { email: string, password: string };

export const getUserById = async ({ email, password }: UserBody) => {
  const findUser = await Users.findOne({ where: { email, password } });
  return findUser;
};
