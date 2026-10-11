// Build-time settings read from environment variables (Cloudflare build settings or a local .env).

const processEnv: Record<string, string | undefined> =
  typeof process !== 'undefined' ? process.env : {};

function isTrue(value: unknown): boolean {
  return ['1', 'true', 'yes'].includes(
    String(value ?? '')
      .trim()
      .toLowerCase(),
  );
}

/** AdSense publisher ID ("ca-pub-…"). Empty means ads are completely off. */
export const ADSENSE_CLIENT = String(import.meta.env.PUBLIC_ADSENSE_CLIENT ?? '').trim();

/** AdSense display ad unit ID. Ad slots render only when this and the client ID are set. */
export const ADSENSE_SLOT = String(import.meta.env.PUBLIC_ADSENSE_SLOT ?? '').trim();

/**
 * Drafts are shown in `npm run dev` and in local preview builds made with SHOW_DRAFTS=true.
 * Production builds never include them.
 */
export const SHOW_DRAFTS =
  import.meta.env.DEV || isTrue(processEnv.SHOW_DRAFTS ?? import.meta.env.SHOW_DRAFTS);
