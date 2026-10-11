// Release checks for the built site in dist/. Run after `npm run build`:
//
//   npm run verify
//
// Fails if a draft article appears anywhere (pages, links, sitemap or search index),
// or if ad code is present while PUBLIC_ADSENSE_CLIENT is unset. When ads are on, it checks
// ads.txt, that legal pages have no ads and that no article has more than three ad slots.
// It also lists any [PLACEHOLDER] text that still needs replacing.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { gunzipSync } from 'node:zlib';
import { loadEnv } from 'vite';
import { readArticleIndex } from './lib/article-index.mjs';
import { assertBuilt, DIST, distFiles, readDist, urlPathFor } from './lib/dist.mjs';

assertBuilt();

const env = loadEnv('production', process.cwd(), '');
const adsenseClient = (env.PUBLIC_ADSENSE_CLIENT ?? '').trim();
const failures = [];
const pass = (message) => console.log(`✓ ${message}`);

const files = distFiles();
const htmlFiles = files.filter((f) => f.endsWith('.html') && !f.startsWith('pagefind/'));
const html = new Map(htmlFiles.map((f) => [f, readDist(f)]));

// ── Drafts ──
const drafts = readArticleIndex().filter((a) => a.draft);
const sitemap = files
  .filter((f) => /^sitemap.*\.xml$/.test(f))
  .map((f) => readDist(f))
  .join('\n');
const searchIndex = files
  .filter((f) => f.startsWith('pagefind/fragment/'))
  .map((f) => gunzipSync(readFileSync(join(DIST, f))).toString('utf8'))
  .join('\n');

for (const draft of drafts) {
  const where = [];
  if (existsSync(join(DIST, draft.path, 'index.html'))) where.push('a built page');
  for (const [file, content] of html) {
    if (content.includes(`href="${draft.path}"`)) where.push(`a link on ${urlPathFor(file)}`);
  }
  if (sitemap.includes(draft.path)) where.push('the sitemap');
  if (searchIndex.includes(`"url":"${draft.path}"`)) where.push('the search index');
  if (where.length)
    failures.push(`Draft ${draft.path} appears in: ${[...new Set(where)].join(', ')}`);
}
if (!files.some((f) => f.startsWith('pagefind/'))) {
  failures.push(
    'The search index (dist/pagefind/) is missing. Run `npm run build`, not just `astro build`.',
  );
}
if (!failures.length)
  pass(`No drafts in pages, links, sitemap or search index (${drafts.length} draft(s) checked).`);

// ── Advertising ──
const adPattern = /adsbygoogle|googlesyndication/;
const pagesWithAds = [...html].filter(([, c]) => adPattern.test(c)).map(([f]) => urlPathFor(f));
if (!adsenseClient) {
  const before = failures.length;
  if (pagesWithAds.length)
    failures.push(`Ad code found while PUBLIC_ADSENSE_CLIENT is unset: ${pagesWithAds.join(', ')}`);
  if (files.includes('ads.txt'))
    failures.push('ads.txt exists while PUBLIC_ADSENSE_CLIENT is unset.');
  if (failures.length === before) pass('Ads are off: no ad code and no ads.txt.');
} else {
  const before = failures.length;
  const expected = `google.com, ${adsenseClient.replace(/^ca-/, '')}, DIRECT, f08c47fec0942fa0`;
  if (!files.includes('ads.txt') || readDist('ads.txt').trim() !== expected) {
    failures.push(`ads.txt is missing or doesn't contain "${expected}".`);
  }
  const noAdPages = [
    '/privacy/',
    '/terms/',
    '/disclaimer/',
    '/contact/',
    '/corrections/',
    '/404.html',
  ];
  for (const path of noAdPages) {
    const file = htmlFiles.find((f) => urlPathFor(f) === path);
    if (file && adPattern.test(html.get(file)))
      failures.push(`Ad code found on ${path}, which must stay ad-free.`);
  }
  for (const [file, content] of html) {
    const slots = (content.match(/<ins class="adsbygoogle"/g) ?? []).length;
    if (slots > 3) failures.push(`${urlPathFor(file)} has ${slots} ad slots (maximum 3).`);
  }
  if (failures.length === before)
    pass(
      `Ads are on for ${adsenseClient}: ads.txt correct, legal pages ad-free, at most 3 slots per page.`,
    );
}

// ── Placeholders (warning only) ──
const placeholders = new Map();
for (const [file, content] of html) {
  for (const [match] of content.matchAll(/\[YOUR [A-Z ,]+\]/g)) {
    if (!placeholders.has(match)) placeholders.set(match, new Set());
    placeholders.get(match).add(urlPathFor(file));
  }
}
if (placeholders.size) {
  console.warn('\n! Placeholders still to replace (see README.md):');
  for (const [text, pages] of placeholders) {
    console.warn(
      `  ${text} on ${[...pages].slice(0, 6).join(', ')}${pages.size > 6 ? ` and ${pages.size - 6} more` : ''}`,
    );
  }
}

if (failures.length) {
  console.error(`\n${failures.length} problem(s):`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log('\n✓ Build verified.');
