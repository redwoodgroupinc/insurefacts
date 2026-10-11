// Site-wide settings. The values in [SQUARE BRACKETS] are placeholders:
// replace them before launch (see "Placeholders to replace" in README.md).

export const site = {
  name: 'InsureFacts',
  domain: 'insurefacts.net',
  url: 'https://insurefacts.net',
  email: 'hello@insurefacts.net',
  tagline: 'Insurance, explained with facts',
  description:
    'Free, factual explanations of how insurance works in the United States, United Kingdom, Canada and Australia, with links to official sources.',
  ownerName: '[YOUR NAME]',
  ownerLocation: '[YOUR CITY, COUNTRY]',
  launchYear: 2026,
  disclaimerShort:
    'InsureFacts provides general factual information only. It is not financial advice. We are not an insurance company, agent or broker.',
  /** Articles whose updatedDate is older than this show a "being reviewed" notice. */
  reviewAfterMonths: 12,
} as const;
