import { queryBuilder } from './planetscale';

export const getSessionList = async () => {
  return await queryBuilder
    .selectFrom('session')
    .innerJoin('user', 'user.id', 'session.user')
    .select(['session.id as id', 'user.username as name', 'date'])
    .execute();
};
