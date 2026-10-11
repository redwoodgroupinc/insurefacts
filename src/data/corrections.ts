// The public corrections log shown on /corrections/. Add the newest entry at the top, e.g.:
// {
//   date: new Date('2026-11-02'),
//   articleTitle: 'What are the parts of Medicare?',
//   articleUrl: '/us/medicare/what-are-the-parts-of-medicare/',
//   summary: 'Corrected the description of when Part B coverage starts.',
// },

export interface Correction {
  date: Date;
  articleTitle: string;
  articleUrl: string;
  summary: string;
}

export const corrections: Correction[] = [];
