// "Popular topics" on the homepage. Each topic links to the matching category in every
// country that has one (matched by the `topic` field in categories.ts).
import type { Topic } from './categories';
import type { IconName } from './icons';

export interface TopicInfo {
  topic: Topic;
  name: string;
  icon: IconName;
}

export const popularTopics: TopicInfo[] = [
  { topic: 'car', name: 'Car insurance', icon: 'car' },
  { topic: 'health', name: 'Health insurance', icon: 'health' },
  { topic: 'home', name: 'Home insurance', icon: 'home' },
  { topic: 'life', name: 'Life insurance', icon: 'life' },
  { topic: 'travel', name: 'Travel insurance', icon: 'travel' },
  { topic: 'pet', name: 'Pet insurance', icon: 'pet' },
  { topic: 'income', name: 'Income protection', icon: 'income' },
  { topic: 'landlord', name: 'Landlord insurance', icon: 'landlord' },
];
