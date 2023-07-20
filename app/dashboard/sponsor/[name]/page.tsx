'use client';
import {
  Bold,
  Button, Callout,
  Card,
  Col,
  Flex,
  Grid,
  List,
  ListItem, Table, TableBody,
  TableCell, TableHead, TableHeaderCell,
  TableRow,
  Text,
  Title
} from '@tremor/react';
import { ArrowsPointingOutIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const jobOffers = [{
  id: '4ef906d2-066a-48cd-b897-230d169d23a8',
  title: 'Software Architect',
  location: 'Hybrid'
},
  {
    id: '4ef906d2-066a-48cd-b897-230d169d23a8',
    title: 'Senior Software Engineer',
    location: 'Hybrid'
  },
  {
    id: '4ef906d2-066a-48cd-b897-230d169d23a8',
    title: 'Data Scientist',
    location: 'Hybrid'
  }];

const urls = [
  {
    id: '255b543e-c7d3-49be-97fb-7b898226b6a3',
    type: 'LinkedIn',
    target: 'https://linkedin.com/company/confluent'
  },
  {
    id: '7fa5f706-89c0-46f1-8008-788465406724',
    type: 'Web',
    target: 'https://confluent.io'
  },
  {
    id: '7c7fe9aa-6e1d-4a9f-b27e-953b41e8f849',
    type: 'Twitter',
    target: 'https://twitter.com/confluent'
  }
];

interface Notification {
  id: string;
  title: string;
  message: string;
  status: string;
}

const notifications: Notification[] = [
  {
    id: '01H5TPXNE1HHT03Y2Z2QED9WXH',
    title: 'Monday - Morning',
    message: 'Join the GFT Retro Gaming Challenge! Step into booth 31 and take a nostalgic ride with Mario Kart. Test your skills in this thrilling game, and the top scorers get a shot at the semifinals and finals. Don\'t miss this incredible experience! Visit our GFT booth and Let the games begin!',
    status: 'sent'
  },
  {
    id: '01H5TPZQB9K34NNMZ6D1KZN5RH',
    title: 'Monday - afternoon',
    message: 'Find out if you\'re one of the semifinalists of the GFT Retro Gaming Challenge! Come to the GFT booth at 4:30 PM and join the semifinals if you\'re among the top 4! There\'s a prize for all the semifinalists and a special reward for the winner. Don\'t miss out, it\'s gonna be a blast!',
    status: 'scheduled'
  }, {
    id: '01H5TQBTZKCYD62RHZ2CB083YH',
    title: 'Tuesday - morning',
    message: 'Are you ready to take your reality to the next level? Visit our GFT booth 31 and WIN a cutting-edge pair of VR glasses! Ask our team how you can get them! See you there!',
    status: 'scheduled'
  }
];

interface Document {
  id: string;
  name: string;
  url: string;
}

const documents: Document[] = [{
  id: '3e8e445f-5a49-4e63-8c9c-4d3351ccf3f0',
  name: 'Contract',
  url: 'https://www.google.com'
}, {
  id: '3e8e445f-5a49-4e63-8c9c-4d3351ccf3f0',
  name: 'Diversity Sponsorship',
  url: 'https://www.google.com'
}, {
  id: '3e8e445f-5a49-4e63-8c9c-4d3351ccf3f0',
  name: 'Terms & agreements',
  url: 'https://www.google.com'
}];

export default function Page({ params }: { params: { name: string } }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (): any => setIsOpen(true);
  const closeModal = (): any => setIsOpen(false);
  return <main>
    <Title>{params.name}</Title>

    <Grid numItemsLg={6} className='gap-6 mt-6'>
      {/* Main section */}
      <Col numColSpanLg={4}>
        <Card className='h-full'>
          <Text><Bold>Description</Bold></Text>
          <Text>Confluent is a digital transformation pioneer that develops sustainable solutions based on new
            technologies
            including artificial intelligence and blockchain/DLT. Confluent experts create and implement scalable
            software
            applications that make access to innovative business models safe and easy.</Text>
          <Flex className='mt-6'>
            <Text>
              <Bold>Urls</Bold>
            </Text>
          </Flex>
          <List className='mt-1'>
            {urls.map((url) => (
              <ListItem key={url.id}>
                  <span><svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 inline' fill='none'
                             viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                    <path strokeLinecap='round' strokeLinejoin='round'
                          d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' />
                  </svg>
                    {url.type}</span>
                <span>{url.target}</span>
              </ListItem>
            ))}
          </List>
          <Text><Bold>Notifications</Bold></Text>
          {notifications.map((notification) => <Callout
            color='neutral'
            icon={CheckCircleIcon}
            key={notification.id}
            title={notification.title}>{notification.message}</Callout>)}

          <div
            className='inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-white pt-12 pb-8 absolute rounded-b-lg'>
            <Button
              icon={ArrowsPointingOutIcon}
              className='bg-white shadow-md border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300'
              onClick={openModal}
            >
              Show more
            </Button>
          </div>
        </Card>
      </Col>

      <Col numColSpanLg={2}>
        <div className='space-y-6'>
          <Card>
            <Text>
              <Bold>
                Logo
              </Bold>
            </Text>
            <Image src='https://www.devbcn.com/images/sponsors/GFT.jpg' alt={params.name} width={500} height={91} />
          </Card>
          <Card>
            <Flex className='mt-6'>
              <Text>
                <Bold>Job Offers</Bold>
              </Text>
              <Text>
                <Bold>Location</Bold>
              </Text>
            </Flex>
            <List className='mt-1'>
              {jobOffers.map((offer) => (
                <ListItem key={offer.id}>
                  <span>{offer.title}</span>
                  <span>{offer.location}</span>
                </ListItem>
              ))}
            </List>
          </Card>
          <Card>
            <Flex className='mt-6'>
              <Text>
                <Bold>Document</Bold>
              </Text>
              <Text>
                <Bold>Type</Bold>
              </Text>
            </Flex>
            <List className='mt-1'>
              {documents.map((doc) => (
                <ListItem key={doc.id}>
                  <span>
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 inline' fill='none' viewBox='0 0 24 24'
                         stroke='currentColor' strokeWidth={2}>
  <path strokeLinecap='round' strokeLinejoin='round'
        d='M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z' />
</svg>
                    {doc.name}</span>
                  <span>{doc.url}</span>
                </ListItem>
              ))}
            </List>
          </Card>
        </div>
      </Col>
    </Grid>

    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-900 bg-opacity-25' />
        </Transition.Child>
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel
                className='w-full max-w-2xl transform overflow-hidden ring-tremor bg-white
                                    p-6 text-left align-middle shadow-tremor transition-all rounded-xl'
              >
                <div className='relative mt-3'>
                  <Table className='h-[450px]'>
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell className='bg-white'>User</TableHeaderCell>
                        <TableHeaderCell className='bg-white text-right'>country</TableHeaderCell>
                        <TableHeaderCell className='bg-white text-right'>
                          lastActive
                        </TableHeaderCell>
                        <TableHeaderCell className='bg-white text-right'>
                          transactions
                        </TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {documents.map((document) => (
                        <TableRow key={document.id}>
                          <TableCell>{document.name}</TableCell>
                          <TableCell className='text-right'>
                            <Text>{document.name}</Text>
                          </TableCell>
                          <TableCell className='text-right'>
                            <Text>{document.name}</Text>
                          </TableCell>
                          <TableCell className='text-right'>
                            <Text>{document.name}</Text>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <div
                      className='absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-white z-0 h-20 w-full' />
                  </Table>
                </div>
                <Button
                  className='mt-5 w-full bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300'
                  onClick={closeModal}
                >
                  Go back
                </Button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  </main>;
}