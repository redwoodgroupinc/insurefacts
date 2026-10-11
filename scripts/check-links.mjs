// Checks every internal link in the built site (dist/): pages, files and #anchors,
// plus every URL in the sitemap. Run after `npm run build`:
//
//   npm run check:links             internal links only (fast, works offline)
//   npm run check:links -- --external   also checks links to other websites (slow)
//
// Exits with an error if any internal link is broken.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { assertBuilt, DIST, distFiles, readDist, urlPathFor } from './lib/dist.mjs';

const SITE_HOST = 'insurefacts.net';
const checkExternal = process.argv.includes('--external');

assertBuilt();

const htmlFiles = distFiles().filter((f) => f.endsWith('.html') && !f.startsWith('pagefind/'));
const idsByPath = new Map();
const pages = htmlFiles.map((file) => {
  const html = readDist(file);
  const path = urlPathFor(file);
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  idsByPath.set(path, ids);
  return { file, path, html };
});

/** Resolves a site path to a file in dist, or null if nothing would be served. */
function resolveFile(pathname) {
  const decoded = decodeURIComponent(pathname);
  const candidates = decoded.endsWith('/')
    ? [join(decoded, 'index.html')]
    : /\.[a-z0-9]+$/i.test(decoded)
      ? [decoded]
      : [];
  return candidates.find((c) => existsSync(join(DIST, c))) ?? null;
}

const broken = [];
const external = new Map();
let checked = 0;

for (const page of pages) {
  // Skip JSON-LD and inline scripts: only real links and resources are checked.
  const html = page.html.replace(/<script[\s\S]*?<\/script>/g, (s) =>
    /\ssrc="/.test(s.split('>')[0]) ? s.split('>')[0] + '>' : '',
  );
  for (const match of html.matchAll(/<(a|link|img|script|source)\b[^>]*?\s(href|src)="([^"]*)"/g)) {
    const [, tag, , raw] = match;
    const value = raw.replace(/&amp;/g, '&');
    if (/^(mailto:|tel:|javascript:|data:)/.test(value)) continue;

    let url;
    try {
      url = new URL(value, `https://${SITE_HOST}${page.path}`);
    } catch {
      broken.push(`${page.path}: invalid URL "${value}"`);
      continue;
    }

    if (url.host !== SITE_HOST) {
      if (tag === 'a' && checkExternal) {
        if (!external.has(url.href)) external.set(url.href, new Set());
        external.get(url.href).add(page.path);
      }
      continue;
    }

    checked += 1;
    const target = url.pathname;
    // Pagefind's files are generated after Astro's build; they exist when the full build ran.
    if (!resolveFile(target)) {
      const hint =
        !target.endsWith('/') && !/\.[a-z0-9]+$/i.test(target) ? ' (missing trailing slash?)' : '';
      broken.push(`${page.path}: <${tag}> links to ${target}${hint}, which does not exist`);
      continue;
    }
    if (url.hash && url.hash.length > 1 && target.endsWith('/')) {
      const id = decodeURIComponent(url.hash.slice(1));
      if (!idsByPath.get(target)?.has(id)) {
        broken.push(`${page.path}: links to ${target}${url.hash}, but that anchor does not exist`);
      }
    }
  }
}

// Every sitemap URL must be a real page.
for (const file of distFiles().filter((f) => /^sitemap.*\.xml$/.test(f))) {
  for (const [, loc] of readDist(file).matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const url = new URL(loc);
    checked += 1;
    if (url.pathname.endsWith('.xml')) continue;
    if (!resolveFile(url.pathname))
      broken.push(`${file}: lists ${url.pathname}, which does not exist`);
  }
}

console.log(`Checked ${checked} internal links across ${pages.length} pages.`);
if (broken.length) {
  console.error(`\n${broken.length} broken internal link(s):`);
  for (const b of broken) console.error(`  ✗ ${b}`);
} else {
  console.log('✓ No broken internal links.');
}

if (checkExternal) {
  console.log(`\nChecking ${external.size} external links (this can take a while)…`);
  const problems = [];
  const urls = [...external.keys()];
  const worker = async () => {
    while (urls.length) {
      const href = urls.pop();
      try {
        const res = await fetch(href, {
          method: 'GET',
          redirect: 'follow',
          signal: AbortSignal.timeout(20000),
          headers: { 'User-Agent': 'Mozilla/5.0 (InsureFacts link checker)' },
        });
        if (res.status >= 400) problems.push(`${res.status} ${href}`);
      } catch (error) {
        problems.push(`ERR ${href} (${error.cause?.code ?? error.name})`);
      }
    }
  };
  await Promise.all(Array.from({ length: 6 }, worker));
  if (problems.length) {
    console.warn(
      `\n${problems.length} external link(s) need a look. Some official sites block automated checks, so open these in a browser:`,
    );
    for (const p of problems.sort()) {
      const [, href] = p.split(/ (?=https?:)/);
      console.warn(
        `  ! ${p}\n      on ${[...(external.get(href?.replace(/ \(.*$/, '')) ?? [])].join(', ')}`,
      );
    }
  } else {
    console.log('✓ All external links responded.');
  }
}

process.exit(broken.length ? 1 : 0);
