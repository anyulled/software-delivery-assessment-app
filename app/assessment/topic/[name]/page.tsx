'use client';
import { assessment, results } from '../../../../lib/data';
import {
  BadgeDelta,
  Card,
  Col,
  Flex,
  Grid,
  Icon,
  List,
  ListItem,
  Text,
  Title
} from '@tremor/react';
import { ArrowUturnLeftIcon, LightBulbIcon } from '@heroicons/react/24/solid';
import { deltaIndicator } from '../../../../lib/functions';
import Link from 'next/link';

export default function Page({ params }: { params: { name: string } }) {
  const topicData = results.filter(
    (topic) => topic.name.replace(' ', '-').toLowerCase() === params.name
  );
  const criticalItems: string[] | undefined = topicData
    .at(0)
    ?.data.filter((item) => (item.key as number) <= 2.5)
    ?.sort((a, b) => (a?.key as number) - (b?.key as number))
    ?.map((item) => item.tooltip as string);

  const recommendedActions: string[] = assessment.topics
    .filter((topic) => topic.name === topicData.at(0)?.name)
    .flatMap((topic) => topic.questions)
    .filter((question) => criticalItems?.includes(question.name))
    .map((question) => question.name.concat(' - ', question.maximumText));
  return (
    <main>
      <Grid numItemsMd={2} className="gap-6">
        <Col numColSpanMd={2}>
          <Card className="m-3">
            <Title className="pl-5">{topicData.at(0)?.name}</Title>
          </Card>
        </Col>
        <Card className="m-3">
          <List>
            {topicData
              .at(0)
              ?.data.sort((a, b) => (a?.key as number) - (b?.key as number))
              .map((data) => (
                <ListItem key={data.key}>
                  <div className="w-full">
                    <Flex>
                      <Text>{data.tooltip}</Text>
                      <BadgeDelta
                        deltaType={deltaIndicator(data.key as number)}
                      >
                        {data.key}
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
            {recommendedActions.map((action) => (
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
      </Grid>
    </main>
  );
}
