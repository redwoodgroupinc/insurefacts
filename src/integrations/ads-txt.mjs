// Writes /ads.txt after the build, but only when an AdSense publisher ID is configured.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/** @param {{ client: string }} options */
export default function adsTxt({ client }) {
  return {
    name: 'insurefacts:ads-txt',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        if (!client) {
          logger.info('PUBLIC_ADSENSE_CLIENT is not set: ads are off and no ads.txt was written.');
          return;
        }
        const publisherId = client.replace(/^ca-/, '');
        const line = `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`;
        writeFileSync(fileURLToPath(new URL('ads.txt', dir)), line);
        logger.info(`Wrote ads.txt for ${publisherId}.`);
      },
    },
  };
}
