// Lightweight, dependency-free scan of the article files.
// Used by astro.config.mjs (sitemap) and the verification scripts, which run
// outside Astro and so can't use getCollection().
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

export const ARTICLES_DIR = join(process.cwd(), 'src', 'content', 'articles');

function walk(dir) {
  let files = [];
  let entries = [];
  try {
    entries = readdirSync(dir);
  } catch {
    return files;
  }
  for (const name of entries) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) files = files.concat(walk(full));
    else if (/\.mdx?$/.test(name)) files.push(full);
  }
  return files;
}

function frontmatterValue(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+?)\\s*$`, 'm'));
  return match ? match[1].replace(/^['"]|['"]$/g, '') : undefined;
}

/**
 * @returns {{ file: string, path: string, draft: boolean, updatedDate?: string }[]}
 */
export function readArticleIndex() {
  return walk(ARTICLES_DIR).map((file) => {
    const source = readFileSync(file, 'utf8');
    const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
    const id = relative(ARTICLES_DIR, file)
      .split(sep)
      .join('/')
      .replace(/\.mdx?$/, '');
    const updated = frontmatterValue(frontmatter, 'updatedDate');
    return {
      file,
      path: `/${id}/`,
      draft: frontmatterValue(frontmatter, 'draft') !== 'false',
      updatedDate: updated ? new Date(updated).toISOString() : undefined,
    };
  });
}
