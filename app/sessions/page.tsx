import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title
} from '@tremor/react';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { getSessionList } from '../../lib/SessionRepository';

export default async function SessionPage() {
  const sessions = await getSessionList();

  return (
    <main className="w-3/5 p-3 mx-auto">
      <Card className="m-4">
        <Title className={'pt-3'}>Session List</Title>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>id</TableHeaderCell>
              <TableHeaderCell>user</TableHeaderCell>
              <TableHeaderCell>date</TableHeaderCell>
              <TableHeaderCell>Action</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell>{session.id}</TableCell>
                <TableCell>{session.name}</TableCell>
                <TableCell>{session.date.toLocaleDateString()}</TableCell>
                <TableCell>
                  <Link href={`sessions/${session.id}`}>view</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <Card className="m-4">
        <Link href={'/assessment'}>
          <Text className="text-center pt-3">
            <ArrowUturnLeftIcon
              height={16}
              display={'inline-block'}
              style={{ display: 'inline-block' }}
            />{' '}
            Back to dashboard
          </Text>
        </Link>
      </Card>
    </main>
  );
}
