import { Card, List, ListItem, Text, Title } from '@tremor/react';
import { queryBuilder } from '../lib/planetscale';
import Search from './search';
import UsersTable from './table';
import { getTopics } from '../lib/ResultRepository';

export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  const users = await queryBuilder
    .selectFrom('user')
    .select(['id', 'name', 'username', 'email', 'role'])
    .where('name', 'like', `%${search}%`)
    .execute();

  const topics = await getTopics();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>
        A list of users retrieved from a MySQL database (PlanetScale).
      </Text>
      <Search />
      <Card className="mt-6">
        <UsersTable users={users} />
      </Card>
      <Card className="mt-6">
        <Title>Users</Title>
        <Text>A list of Topics.</Text>
        <List>
          {topics.map((topic) => (
            <ListItem key={topic.id}>{topic.name}</ListItem>
          ))}
        </List>
      </Card>
    </main>
  );
}
