// @astrojs/sitemap writes sitemap-index.xml. Many tools look for /sitemap.xml by default,
// so this copies the index there after the build.
import { copyFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export default function sitemapAlias() {
  return {
    name: 'insurefacts:sitemap-alias',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const index = fileURLToPath(new URL('sitemap-index.xml', dir));
        if (!existsSync(index)) {
          logger.warn('sitemap-index.xml not found; /sitemap.xml was not created.');
          return;
        }
        copyFileSync(index, fileURLToPath(new URL('sitemap.xml', dir)));
      },
    },
  };
}
