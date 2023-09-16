import { queryBuilder } from './planetscale';

export const lookupUser = async (username: string) => {
  const user = await queryBuilder
    .selectFrom('user')
    .select(['id', 'name', 'username', 'email', 'role'])
    .where('name', 'like', `%${username}%`)
    .execute();
  return user.at(0);
};
