import { queryBuilder } from './planetscale';

export const getTopics = async () => {
  return await queryBuilder
    .selectFrom('topic')
    .select(['id', 'name', 'description'])
    .execute();
};

export const getTopicsResult = async (topic: string) => {
  return await queryBuilder
    .selectFrom('result')
    .innerJoin('question', 'question.id', 'result.question_id')
    .innerJoin('session', 'result.session_id', 'session.id')
    .innerJoin('topic', 'question.topic_id', 'topic.id')
    .select([
      'question.id',
      'question.name as question_name',
      'result.value',
      'question.description',
      'topic.name as topic',
      'question.maximum_text as recommended_action'
    ])
    .where('topic.name', '=', `${topic}`)
    .execute();
};

export const getSessionResult = async () => {
  return await queryBuilder
    .selectFrom('result')
    .innerJoin('question', 'question.id', 'result.question_id')
    .innerJoin('topic', 'topic.id', 'question.topic_id')
    .innerJoin('session_topic', 'session_topic.id', 'topic.id')
    .select((eb) => [
      'topic.name',
      eb.fn.avg<number>('result.value').as('average')
    ])
    .groupBy('topic.name')
    .execute();
};
