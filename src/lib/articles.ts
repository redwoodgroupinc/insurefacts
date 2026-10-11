import { getCollection, type CollectionEntry } from 'astro:content';
import { site } from '../data/site';
import { SHOW_DRAFTS } from './env';

export type Article = CollectionEntry<'articles'>;

const byUpdatedDesc = (a: Article, b: Article) =>
  b.data.updatedDate.getTime() - a.data.updatedDate.getTime() ||
  a.data.title.localeCompare(b.data.title);

/** All articles that belong on the site, newest update first. Drafts are excluded in production. */
export async function getArticles(): Promise<Article[]> {
  const entries = await getCollection('articles', ({ data }) => SHOW_DRAFTS || !data.draft);
  return entries.sort(byUpdatedDesc);
}

export function articleUrl(article: Article): string {
  return `/${article.id}/`;
}

export function articleSlug(article: Article): string {
  return article.id.split('/')[2];
}

/** Reading time in whole minutes, at roughly 225 words per minute. */
export function readingTime(markdown = ''): number {
  const text = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`|-]/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 225));
}

/** True when an article hasn't been updated within the review window (checked at build time). */
export function needsReview(updatedDate: Date, now = new Date()): boolean {
  const cutoff = new Date(now);
  cutoff.setUTCMonth(cutoff.getUTCMonth() - site.reviewAfterMonths);
  return updatedDate < cutoff;
}
