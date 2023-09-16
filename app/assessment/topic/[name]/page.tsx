'use client';
import {
  BadgeDelta,
  Card,
  Col,
  Flex,
  Icon,
  List,
  ListItem,
  Text,
  Title
} from '@tremor/react';
import { ArrowUturnLeftIcon, LightBulbIcon } from '@heroicons/react/24/solid';
import { deltaIndicator } from '../../../../lib/functions';
import Link from 'next/link';
import useSWR from 'swr';

interface Payload {
  id: number;
  question_name: string;
  value: number;
  description: string;
  topic: string;
  recommended_action: string;
}

const average = 2.5;
const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());
export default function Page({ params }: { params: { name: string } }) {
  const apiUrl = `http://localhost:3000/api/results/${params.name}`;
  const { data, error } = useSWR<Payload[]>(apiUrl, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const topicData = data?.at(0)?.topic;

  const sortedItems:
    | Array<{ id: number; name: string; score: number }>
    | undefined = data
    ?.slice()
    .sort((a, b) => a.value - b.value)
    .map((data) => ({
      id: data.id,
      name: data.question_name,
      score: data.value
    }));

  const recommendedActions: string[] | undefined = data
    ?.filter((item) => item.value <= average)
    .map((item) => item.recommended_action);

  return (
    <main>
      <Col numColSpanMd={2}>
        <Card className="m-3">
          <Title className="pl-5">{topicData}</Title>
        </Card>
      </Col>
      <Card className="m-3">
        <List>
          {sortedItems?.map((data) => (
            <ListItem key={data.id}>
              <div className="w-full">
                <Flex>
                  <Text>{data.name}</Text>
                  <BadgeDelta deltaType={deltaIndicator(data.score)}>
                    {data.score}
                  </BadgeDelta>
                </Flex>
              </div>
            </ListItem>
          ))}
        </List>
      </Card>
      <Card className="m-3">
        <Title className={'pt-3'}>Recommended Practices</Title>
        <List>
          {recommendedActions?.map((action) => (
            <ListItem key={action.length}>
              <Text className={'text-left'}>
                <Icon icon={LightBulbIcon} size="xs" color="lime" />
                {action}
              </Text>
            </ListItem>
          ))}
        </List>
      </Card>
      <Col numColSpanMd={2}>
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
      </Col>
    </main>
  );
}
