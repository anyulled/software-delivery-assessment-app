import { TrackerBlockProps } from '@tremor/react/dist/components/vis-elements/Tracker/Tracker';

export interface Assessment {
  topics: Topic[];
}

export interface UserResults {
  user: User;
  completionTime: Date;
  answers: QuestionEvaluation[];
}

export interface QuestionEvaluation {
  id: number;
  evaluation: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  team: string;
  role: string;
}

export interface Topic {
  name: string;
  description: string;
  questions: Question[];
}

export interface Question {
  id: number;
  name: string;
  description: string;
  minimumText: string;
  maximumText: string;
}

export interface IterationResults {
  results: UserResults[];
}

export interface PageResult {
  name: string;
  score: number;
  data: TrackerBlockProps[];
  enabled: boolean;
}

export interface TopicInformationProps {
  category: string;
  value: number;
  data: TrackerBlockProps[];
}