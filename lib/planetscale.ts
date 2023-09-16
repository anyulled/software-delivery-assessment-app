import 'server-only';
import { Generated, Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';

interface User {
  id: Generated<number>;
  name: string;
  username: string;
  password: string;
  email: string;
  role: string;
}

interface Topic {
  id: Generated<number>;
  name: string;
  description: string;
}

export interface Question {
  id: Generated<number>;
  name: string;
  description: string;
  minimum_text: string;
  maximum_text: string;
  topic_id: string;
}

export interface SessionsTopic {
  id: Generated<number>;
  session_id: string;
  topic_id: string;
}

interface Session {
  id: Generated<number>;
  user: User;
  date: Date;
  organization_id: number;
}

interface Result {
  id: Generated<number>;
  question_id: string;
  value: number;
  session_id: string;
}

interface Organization {
  id: Generated<number>;
  name: string;
  website_url?: string;
  logo_url?: string;
}

interface UserOrganization {
  id: Generated<number>;
  user_id: number;
  organization_id: number;
}

interface Database {
  user: User;
  topic: Topic;
  question: Question;
  result: Result;
  session: Session;
  session_topic: SessionsTopic;

  // https://github.com/nextauthjs/next-auth/issues/4922
}

export const queryBuilder: Kysely<Database> = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL
  })
});
