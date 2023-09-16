import { Card, Col, List, Text, Title } from '@tremor/react';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function SessionPage({ params }: { params: { id: number } }) {
  return (
    <main>
      <Col numColSpanMd={2}>
        <Card className="m-3">
          <Title className="pl-5">Session detail {params.id}</Title>
        </Card>
      </Col>
      <Card className="m-3">
        <List></List>
      </Card>
      <Card className="m-3">
        <Title className={'pt-3'}>Recommended Practices</Title>
        <List></List>
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
