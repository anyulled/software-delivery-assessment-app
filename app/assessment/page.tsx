'use client';
import {
  Bold,
  Card,
  Flex,
  Grid,
  ProgressBar,
  Subtitle,
  Text,
  Title,
  Tracker
} from '@tremor/react';

import { FC } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { results } from '../../lib/data';
import { colorIndicator, levelAdvice } from '../../lib/functions';
import { TopicInformationProps } from '../../lib/types';

const TopicInformation: FC<TopicInformationProps> = ({
  category,
  value,
  data
}) => (
  <div className="h-44">
    <Link href={`assessment/topic/${category.replace(' ', '-').toLowerCase()}`}>
      <Title>
        <Bold>{category}</Bold>
      </Title>
    </Link>
    <Flex className="truncate" justifyContent="between">
      <Subtitle color={colorIndicator(value)}>{levelAdvice(value)}</Subtitle>
    </Flex>
    <ProgressBar
      color={colorIndicator(value)}
      value={value * 20}
      className="mt-3"
    />
    <Flex justifyContent="between" className="mt-3">
      <div>
        <Title color="red">Tired</Title>
      </div>
      <div>
        <Text className="text-center" color={colorIndicator(value)}>
          {value}
        </Text>
      </div>
      <div className="text-right">
        <Title color="green">Inspired</Title>
      </div>
    </Flex>
    <div>
      <Tracker data={data} className="mt-2" />
    </div>
  </div>
);
export default function PlaygroundPage() {
  return (
    <>
      <Head>
        <title>Software Delivery Assessment</title>
      </Head>
      <main>
        <Title className="pl-3.5">Software Delivery Assessment</Title>
        <Text className="pl-3.5">Iteration Date: 10/07/2023 </Text>

        <Grid numItemsMd={4} className="mt-6 gap-6 p-3">
          {results
            .filter((result) => result.enabled)
            .map((result) => (
              <Card key={result.name}>
                <TopicInformation
                  category={result.name}
                  value={result.score}
                  data={result.data}
                />
              </Card>
            ))}
        </Grid>
      </main>
    </>
  );
}
