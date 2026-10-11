// Builds the markup for one AdSense ad unit. Returns an empty string (no markup, no script)
// unless both PUBLIC_ADSENSE_CLIENT and PUBLIC_ADSENSE_SLOT are set.
//
// Placement rules (enforced by where AdSlot is used, see src/pages/[country]/[category]/[slug].astro):
// only after the quick answer box, mid-article and after the sources — at most three per article,
// never in the header, navigation, next to buttons, or inside the quick answer or sources boxes.
import { ADSENSE_CLIENT, ADSENSE_SLOT } from './env';

export type AdPosition = 'after-quick-answer' | 'mid-article' | 'after-sources';

export const adsEnabled = ADSENSE_CLIENT !== '' && ADSENSE_SLOT !== '';

const escapeAttr = (value: string) => value.replace(/[&"<>]/g, (c) => `&#${c.charCodeAt(0)};`);

export function adSlotHtml(position: AdPosition): string {
  if (!adsEnabled) return '';
  return `<aside class="ad-slot" aria-label="Advertisement" data-ad-position="${position}" data-pagefind-ignore>
  <p class="ad-slot__label">Advertisement</p>
  <div class="ad-slot__frame">
    <ins class="adsbygoogle" style="display:block" data-ad-client="${escapeAttr(ADSENSE_CLIENT)}" data-ad-slot="${escapeAttr(ADSENSE_SLOT)}" data-ad-format="auto" data-full-width-responsive="true"></ins>
  </div>
  <script>(window.adsbygoogle = window.adsbygoogle || []).push({});</script>
</aside>`;
}
