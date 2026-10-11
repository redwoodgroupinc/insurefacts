// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';
import { readArticleIndex } from './scripts/lib/article-index.mjs';
import adsTxt from './src/integrations/ads-txt.mjs';
import sitemapAlias from './src/integrations/sitemap-alias.mjs';

const SITE = 'https://insurefacts.net';

// Reads .env files too, so `PUBLIC_ADSENSE_CLIENT` works locally as well as on Cloudflare.
const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const adsenseClient = (env.PUBLIC_ADSENSE_CLIENT ?? '').trim();

if (adsenseClient && !/^ca-pub-\d{16}$/.test(adsenseClient)) {
  throw new Error(
    `PUBLIC_ADSENSE_CLIENT must look like "ca-pub-" followed by 16 digits. Received "${adsenseClient}".`,
  );
}

// Drafts are never built in production, but the sitemap filter excludes them as well,
// so they can't leak even into a SHOW_DRAFTS preview build.
const articles = readArticleIndex();
const draftPaths = new Set(articles.filter((a) => a.draft).map((a) => a.path));
const lastModByPath = new Map(
  articles.filter((a) => !a.draft && a.updatedDate).map((a) => [a.path, a.updatedDate]),
);

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        return path !== '/search/' && path !== '/404/' && !draftPaths.has(path);
      },
      serialize: (item) => {
        const lastmod = lastModByPath.get(new URL(item.url).pathname);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
    sitemapAlias(),
    adsTxt({ client: adsenseClient }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
