import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { categories } from './data/categories';
import { COUNTRY_CODES } from './data/countries';

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Article ids mirror their file path: "us/medicare/what-are-the-parts-of-medicare".
 * The folder names must match the frontmatter, so a misplaced file fails the build.
 */
function articleId({ entry, data }: { entry: string; data: Record<string, unknown> }): string {
  const id = entry.replace(/\.mdx?$/, '');
  const parts = id.split('/');
  const problem = (message: string) =>
    new Error(`Article "src/content/articles/${entry}": ${message}`);

  if (parts.length !== 3) {
    throw problem('articles must live at src/content/articles/<country>/<category>/<slug>.md');
  }
  const [country, category, slug] = parts;
  if (!SLUG_PATTERN.test(slug)) {
    throw problem(`the file name "${slug}" must be lowercase words separated by hyphens`);
  }
  if (data.country !== country) {
    throw problem(`frontmatter country "${data.country}" doesn't match the folder "${country}"`);
  }
  if (data.category !== category) {
    throw problem(`frontmatter category "${data.category}" doesn't match the folder "${category}"`);
  }
  return id;
}

const source = z.object({
  publisher: z.string().min(2),
  title: z.string().min(2),
  url: z.url({ protocol: /^https$/, error: 'Source URLs must be full https:// links' }),
});

const articles = defineCollection({
  loader: glob({
    base: './src/content/articles',
    pattern: '**/*.{md,mdx}',
    generateId: articleId,
  }),
  schema: z
    .object({
      title: z.string().min(10).max(110),
      description: z
        .string()
        .min(140, 'description must be 140–160 characters (it is used as the SEO meta description)')
        .max(
          160,
          'description must be 140–160 characters (it is used as the SEO meta description)',
        ),
      country: z.enum(COUNTRY_CODES),
      category: z.string(),
      quickAnswer: z.string().min(40),
      author: z.string().min(2),
      publishedDate: z.coerce.date(),
      updatedDate: z.coerce.date(),
      keyFacts: z.array(z.string().min(5)).optional(),
      sources: z.array(source).min(1, 'every article must cite at least one official source'),
      draft: z.boolean(),
    })
    .strict()
    .superRefine((data, ctx) => {
      if (!categories.some((c) => c.country === data.country && c.slug === data.category)) {
        const valid = categories
          .filter((c) => c.country === data.country)
          .map((c) => c.slug)
          .join(', ');
        ctx.addIssue({
          code: 'custom',
          path: ['category'],
          message: `"${data.category}" is not a category for ${data.country}. Valid categories: ${valid}. Add new ones in src/data/categories.ts.`,
        });
      }
      if (data.updatedDate < data.publishedDate) {
        ctx.addIssue({
          code: 'custom',
          path: ['updatedDate'],
          message: 'updatedDate cannot be earlier than publishedDate',
        });
      }
    }),
});

export const collections = { articles };
