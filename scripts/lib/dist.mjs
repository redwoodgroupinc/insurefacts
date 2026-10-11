// Helpers for scripts that inspect the built site in dist/.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

export const DIST = join(process.cwd(), 'dist');

export function assertBuilt() {
  if (!existsSync(join(DIST, 'index.html'))) {
    console.error('No built site found in dist/. Run `npm run build` first.');
    process.exit(1);
  }
}

/** All files under dist/, as paths relative to dist using forward slashes. */
export function distFiles(dir = DIST) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return distFiles(full);
    return [relative(DIST, full).split(sep).join('/')];
  });
}

export function readDist(file) {
  return readFileSync(join(DIST, file), 'utf8');
}

/** The URL path a built HTML file is served at, e.g. "uk/index.html" -> "/uk/". */
export function urlPathFor(file) {
  if (file === 'index.html') return '/';
  if (file.endsWith('/index.html')) return `/${file.slice(0, -'index.html'.length)}`;
  return `/${file}`;
}
