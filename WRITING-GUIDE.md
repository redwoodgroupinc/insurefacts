# InsureFacts writing guide

This guide explains how to add and update articles, and the rules every article must follow. If you only read one section, read [The rules](#the-rules).

## Contents

1. [The rules](#the-rules)
2. [Add a new article](#add-a-new-article)
3. [Frontmatter fields](#frontmatter-fields)
4. [Writing the article body](#writing-the-article-body)
5. [Local spelling and terms](#local-spelling-and-terms)
6. [Words and phrases to avoid](#words-and-phrases-to-avoid)
7. [Publish a draft](#publish-a-draft)
8. [Update or correct an article](#update-or-correct-an-article)
9. [Add a new category](#add-a-new-category)

## The rules

These are legal and business requirements. They apply to every article, every time.

1. **Facts only.** Explain how insurance works, what the rules are and what terms mean. Never give personal or general advice.
2. **Never tell readers what they “should” do.** No “you should buy…”, “we recommend…”, “the best option is…”.
3. **Never recommend an insurer, broker, product or comparison site.** You may name a public body or government insurer when it is a fact (for example, “in British Columbia, basic car insurance is sold by ICBC”), but never as a recommendation.
4. **Always cite official sources.** Every article needs at least one, and every important fact should link to one. See [preferred sources](#preferred-sources).
5. **Never invent facts, prices, percentages, limits or dates.** If you can’t find it in an official source, leave it out. Figures that change every year (premiums, deductibles, limits) are best left out or clearly linked to the official page that publishes them.
6. **Use local spelling and terms** for the country the article is about. See [Local spelling and terms](#local-spelling-and-terms).
7. **One country per article.** Rules differ between countries, states, provinces and territories. Say clearly when something only applies in part of a country.

### Preferred sources

| Country        | Prefer                                                                                                                             |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| United States  | State insurance departments, NAIC, HealthCare.gov, Medicare.gov, USA.gov, CMS                                                      |
| United Kingdom | FCA, MoneyHelper, Financial Ombudsman Service, GOV.UK, legislation.gov.uk                                                          |
| Canada         | Provincial and territorial insurance regulators, canada.ca, travel.gc.ca, public auto insurers (ICBC, SGI, MPI, SAAQ), Insurance Bureau of Canada (say it’s an industry association) |
| Australia      | ASIC Moneysmart, APRA, privatehealth.gov.au, AFCA, state and territory CTP regulators (SIRA, MAIC, TAC and others)                 |

Don’t use insurers’ marketing pages, blogs, forums, news articles or AI chat answers as sources.

## Add a new article

1. **Pick the country and category.** The category must already exist in [`src/data/categories.ts`](src/data/categories.ts). The current folder names are:

   | Country      | Category folders                                                                                                                           |
   | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
   | `us`         | `health-insurance`, `car-insurance`, `homeowners-insurance`, `renters-insurance`, `life-insurance`, `medicare`, `travel-insurance`, `pet-insurance` |
   | `uk`         | `car-insurance`, `home-insurance`, `life-insurance`, `travel-insurance`, `pet-insurance`, `landlord-insurance`, `income-protection`        |
   | `ca`         | `car-insurance`, `home-tenant-insurance`, `life-insurance`, `travel-medical`, `supplementary-health`                                        |
   | `au`         | `ctp`, `car-insurance`, `home-contents`, `private-health`, `life-insurance`, `income-protection`, `landlord-insurance`                     |

2. **Create the file** at `src/content/articles/<country>/<category>/<slug>.md`. The file name becomes the web address, so use lowercase words separated by hyphens. For example:

   `src/content/articles/uk/travel-insurance/what-is-a-ghic.md` → `https://insurefacts.net/uk/travel-insurance/what-is-a-ghic/`

3. **Copy this template** into the file and fill it in. Keep `draft: true` until the article has been fact-checked.

   ```yaml
   ---
   title: 'What is a GHIC?'
   description: 'A sentence or two of 140 to 160 characters that summarises the article. It appears in Google results, so make it specific and factual.'
   country: uk
   category: travel-insurance
   quickAnswer: 'Two or three sentences that answer the question in the title directly.'
   author: 'Your Name'
   publishedDate: 2026-11-01
   updatedDate: 2026-11-01
   keyFacts:
     - 'A short fact from the article.'
     - 'Another short fact.'
   sources:
     - publisher: 'GOV.UK'
       title: 'Exact title of the page'
       url: 'https://www.gov.uk/...'
   draft: true
   ---

   Introductory paragraph.

   ## First section heading
   ```

4. **Preview it** with `npm run dev` and open the article’s address. Drafts are visible in `npm run dev` (with a yellow “Draft” banner) but never in the live site.

5. **Check it.** Run `npm run build`. The build stops with a clear message if a required field is missing, the description is the wrong length, the category doesn’t exist, or the file is in the wrong folder.

## Frontmatter fields

The block between the two `---` lines at the top of the file is the frontmatter. All fields are required unless marked optional.

| Field           | What to write                                                                                                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`         | The article’s headline, usually a question readers search for. 10–110 characters.                                                                                              |
| `description`   | 140–160 characters. Used as the page’s description in search results and on article cards. The build fails if it’s shorter or longer.                                         |
| `country`       | `us`, `uk`, `ca` or `au`. Must match the folder.                                                                                                                                |
| `category`      | A category slug for that country (see the table above). Must match the folder.                                                                                                 |
| `quickAnswer`   | 2–3 sentences shown in the “Quick answer” box at the top. Answer the title’s question directly, with no advice.                                                                 |
| `author`        | The writer’s real name.                                                                                                                                                         |
| `publishedDate` | The date first published, as `YYYY-MM-DD`.                                                                                                                                      |
| `updatedDate`   | The date of the last real update, as `YYYY-MM-DD`. Can’t be earlier than `publishedDate`. Articles not updated for 12 months show “This article is being reviewed for updates.” |
| `keyFacts`      | _Optional._ A list of short facts shown in a “Key facts” box. Every fact must also appear, with a source, in the article body.                                                  |
| `sources`       | At least one. Each source has a `publisher` (for example `GOV.UK`), the page `title` and the full `https://` `url`. They’re shown as a numbered list.                           |
| `draft`         | `true` or `false`. Drafts are never built into the live site, its search or its sitemap.                                                                                       |

**Tips for YAML:** wrap text in single quotes. If the text itself contains an apostrophe, use a curly one (’) or type it twice (`''`). Placeholders like `[YOUR NAME]` must be in quotes.

## Writing the article body

- **Don’t add a `#` heading.** The title is shown automatically as the page’s main heading.
- **Start with a short introduction** that says what the article covers.
- **Use `##` for main sections** and `###` for sub-sections. Sections appear in the “On this page” contents box. Write headings that make sense on their own.
- **Cite as you go.** Add the source number after the fact, linking to the sources list: `[[2]](#source-2)` shows as a small “[2]” that jumps to the second source. The numbers follow the order of the `sources` list in the frontmatter.
- **Use lists and tables** for steps, comparisons and state-by-state differences. Tables scroll sideways on phones automatically.
- **Link to related InsureFacts pages** where helpful, using addresses that start with `/` and end with `/`, for example `[travel insurance in the UK](/uk/travel-insurance/)`.
- **Keep sentences short.** Explain each technical term the first time you use it, or link to the [glossary](/glossary/).
- **End with “Where to check the details”**, pointing readers to the official source for the most current rules.

**About ads:** when ads are switched on, they appear automatically after the quick answer, after the sources, and in the middle of the article (just before the fourth `##` section). Articles with fewer than four `##` sections don’t get the middle ad. You don’t need to add anything for ads, and you must never add ad code to an article yourself.

Articles can also be written as `.mdx` files, but plain `.md` is recommended: the middle-of-article ad only works in `.md` files.

## Local spelling and terms

Use the spelling and vocabulary of the country the article is about.

| Topic                    | United States        | United Kingdom              | Canada                     | Australia                    |
| ------------------------ | -------------------- | --------------------------- | -------------------------- | ---------------------------- |
| Amount you pay on claims | deductible           | excess                      | deductible                 | excess                       |
| Car part                 | tire                 | tyre                        | tire                       | tyre                         |
| Spelling of -our words   | color, labor         | colour, labour              | colour, labour             | colour, labour               |
| Spelling of -re words    | center, theater      | centre, theatre             | centre, theatre            | centre, theatre              |
| -ize / -ise              | organize, recognize  | organise, recognise         | organize, recognize        | organise, recognise          |
| Travel                   | traveling, traveler  | travelling, traveller       | travelling, traveller      | travelling, traveller        |
| Driving permit           | license              | licence (noun)              | licence (noun)             | licence (noun)               |
| Government scheme        | program              | programme                   | program                    | program                      |
| Car insurance            | auto or car insurance | car or motor insurance     | car or auto insurance      | car insurance; CTP / green slip |
| Renter’s cover           | renters insurance    | contents insurance          | tenant insurance           | renters (contents) insurance |
| Dates in text            | October 11, 2026     | 11 October 2026             | October 11, 2026           | 11 October 2026              |

Dates shown on article pages are formatted automatically for each country.

## Words and phrases to avoid

| Avoid                                         | Write instead                                                     |
| --------------------------------------------- | ----------------------------------------------------------------- |
| “You should get…”, “You need to buy…”         | “Policies can include…”, “The law requires…” (only if it does)    |
| “We recommend…”, “Our pick…”, “The best…”     | Describe the options and how they differ                          |
| “Cheap”, “great value”, “top-rated” insurers  | Don’t rate or compare insurers at all                             |
| “Always”, “never”, “guaranteed”               | Only when an official source says so                              |
| “Experts say…”, “Most people…”                | Name the official source, or leave it out                         |
| A figure with no source                       | Cite the official source and its date, or leave the figure out    |

Reporting what an official body advises is fine when it’s clearly attributed, for example: “The Government of Canada advises travellers to read their policy before they leave.”

## Publish a draft

1. **Fact-check every sentence** against the cited source. Open each source link and confirm it still says what the article says.
2. **Check the external links work.** On your own computer, run `npm run build`, then `npm run check:links -- --external`.
3. **Set the author** to a real name.
4. **Set `draft: false`** and set `updatedDate` (and `publishedDate`, for a first publication) to today.
5. **Build and verify:** `npm run build` then `npm run verify`. Both must finish without errors.
6. **Commit and push.** Cloudflare rebuilds and publishes the site automatically.

## Update or correct an article

- When you change facts, update `updatedDate`. Don’t change it for typo fixes.
- For a factual correction, also add an entry to [`src/data/corrections.ts`](src/data/corrections.ts) so it appears on the public Corrections page.
- If a rule has changed, update the article and its sources, and check whether other articles mention the same rule.

## Add a new category

1. Add an entry to [`src/data/categories.ts`](src/data/categories.ts) with the `country`, a lowercase hyphenated `slug`, `name`, `topic`, `icon`, a one-line `description` and a short factual `intro`. Optional `links` add an “Official sources on this topic” box.
2. Create the folder `src/content/articles/<country>/<slug>/` for its articles.
3. Run `npm run build`. The category page is created automatically and appears on the country page.
