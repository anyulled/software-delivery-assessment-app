'use client';

import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title
} from '@tremor/react';
import Link from 'next/link';
import { data, Sponsor, SponsorExtras, SponsorLevel, SponsorStatus, SponsorType } from './sponsorDAta';

export default function DashboardPage() {
  return (
    <main className='p-4 md:p-10 mx-auto max-w-7xl'>
      <Title>Backend Dashboard</Title>
      <Table className='mt-5'>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>Contact Person</TableHeaderCell>
            <TableHeaderCell>Level</TableHeaderCell>
            <TableHeaderCell>Extras</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Last update</TableHeaderCell>
            <TableHeaderCell>Documents</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((sponsor: Sponsor) => (<TableRow key={sponsor.id}>
            <TableCell>
              <Text>{sponsor.name}</Text>
            </TableCell>
            <TableCell>
              {SponsorType[sponsor.type].replaceAll('_', ' ')}
            </TableCell>
            <TableCell>
              {sponsor.contact?.at(0)?.name}
            </TableCell>
            <TableCell>
              <Badge color={'blue'}>
                {SponsorLevel[sponsor.level]}
              </Badge>
            </TableCell>
            <TableCell>
              {sponsor.extras?.map((extra, index) => <><Badge size={'xs'}
                                                              key={index}>{SponsorExtras[extra]}</Badge><br /></>)}
            </TableCell>
            <TableCell>
              <Badge color={'amber'}>
                {SponsorStatus[sponsor.status]}
              </Badge>
            </TableCell>
            <TableCell>
              <Text>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 inline' fill='none' viewBox='0 0 24 24'
                     stroke='currentColor' strokeWidth={2}>
                  <path strokeLinecap='round' strokeLinejoin='round'
                        d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                </svg>
                {' '}
                {sponsor.lastUpdateDate.toLocaleDateString()}
              </Text>
            </TableCell>
            <TableCell>
              {sponsor.documents?.map((document, index) => <Text key={index}>
                <a href={document} target={'_blank'} rel='noopener noreferer'>
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 inline' fill='none' viewBox='0 0 24 24'
                       stroke='currentColor' strokeWidth={2}>
                    <path strokeLinecap='round' strokeLinejoin='round'
                          d='M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z' />
                  </svg>
                </a>
              </Text>)}
            </TableCell>
            <TableCell>
              <Link href={`/dashboard/sponsor/${sponsor.name}`}>
                <Button size={'xs'} color={'blue'}>Edit</Button>
              </Link>
            </TableCell>
          </TableRow>))}
        </TableBody>
      </Table>
    </main>
  );
}