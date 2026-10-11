# InsureFacts

**[insurefacts.net](https://insurefacts.net)** is a free, factual insurance information website for the United States, United Kingdom, Canada and Australia. It explains how insurance works, with links to official sources. It doesn’t sell insurance or give advice.

The site is completely static: no database, no accounts, no forms and no personal data collection. It’s built with [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com) and [Pagefind](https://pagefind.app) search, and is designed to be hosted for free on Cloudflare.

## Contents

1. [Run the site on your computer](#1-run-the-site-on-your-computer)
2. [Add an article](#2-add-an-article)
3. [Deploy on Cloudflare](#3-deploy-on-cloudflare)
4. [Connect insurefacts.net](#4-connect-insurefactsnet)
5. [Turn on Google AdSense](#5-turn-on-google-adsense)
6. [Set up hello@insurefacts.net](#6-set-up-helloinsurefactsnet-email-forwarding)
7. [Placeholders to replace](#7-placeholders-to-replace)
8. [Commands](#commands)
9. [Project structure](#project-structure)
10. [Quality checks](#quality-checks)

## 1. Run the site on your computer

You need:

- **Node.js 22.12 or newer.** Download the “LTS” version from [nodejs.org](https://nodejs.org). To check your version, run `node --version` in a terminal.
- **Git**, from [git-scm.com](https://git-scm.com).

Then, in a terminal:

```bash
git clone https://github.com/<your-account>/insurefacts.git
cd insurefacts
npm install
npm run dev
```

Open **http://localhost:4321** in your browser. The page reloads automatically when you save a file. Press `Ctrl + C` in the terminal to stop.

Things to know about `npm run dev`:

- **Draft articles are shown**, with a yellow “Draft” banner, so you can preview them. They are never included in the live site.
- **Search doesn’t work in dev mode**, because the search index is created during the build. To try search, build and preview the site:

  ```bash
  npm run build
  npm run preview
  ```

- **To preview drafts with search**, build with drafts switched on. This is for your own computer only; never set it on Cloudflare.

  ```bash
  # macOS / Linux
  SHOW_DRAFTS=true npm run build && npm run preview
  # Windows PowerShell
  $env:SHOW_DRAFTS="true"; npm run build; npm run preview; Remove-Item Env:SHOW_DRAFTS
  ```

## 2. Add an article

Articles are Markdown files in `src/content/articles/<country>/<category>/<slug>.md`. The full step-by-step guide, the frontmatter fields and the house rules (facts only, no “you should”, never recommend an insurer, always cite official sources, local spelling) are in **[WRITING-GUIDE.md](WRITING-GUIDE.md)**.

The build checks every article automatically and stops with a clear message if, for example, the description isn’t 140–160 characters, a source is missing, or the category doesn’t exist.

## 3. Deploy on Cloudflare

Cloudflare builds the site from GitHub and redeploys it automatically every time you push a change. Hosting a static site like this is free.

1. Push this project to a GitHub repository.
2. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) (create a free account if you need one).
3. Go to **Workers & Pages** and select **Create application**.
4. Next to **Import a repository**, select **Get started**. Connect your GitHub account if asked, and choose the `insurefacts` repository.
5. Configure the project:
   - **Project name:** `insurefacts`. This must match the `name` in [`wrangler.jsonc`](wrangler.jsonc), or the build fails.
   - **Build command:** `npm run build`
   - **Deploy command:** leave the default, `npx wrangler deploy`.
   - The output folder, **`dist`**, is already set in `wrangler.jsonc` (`assets.directory`), along with the custom 404 page.
6. Select **Save and Deploy**. When the build finishes, the site is live at an address like `insurefacts.<your-subdomain>.workers.dev`.

**Already created a Worker named `insurefacts`** (for example from the “Hello World” starter)? Connect it to GitHub instead of creating a new one: open the Worker, go to **Settings → Builds → Connect**, choose the `insurefacts` repository and the `main` branch, and use the same build and deploy commands as above. Builds start when a commit is pushed to `main`; the “Hello world” response is replaced by the site after the first successful build.

Cloudflare uses the Node.js version in [`.nvmrc`](.nvmrc) (22). If you ever need a different version, add a build variable `NODE_VERSION` (see step 5 for where build variables go).

<details>
<summary>Using Cloudflare Pages instead</summary>

If you prefer Cloudflare Pages: in **Workers & Pages → Create application**, choose the Pages option, connect the repository, and set **Build command** to `npm run build` and **Build output directory** to `dist`. Pages ignores `wrangler.jsonc` and uses `dist/404.html` automatically. Pages environment variables are set under the project’s **Settings → Variables and Secrets**.

</details>

The headers in [`public/_headers`](public/_headers) add basic security headers, long-term caching for fingerprinted files, and a `noindex` header on the `*.workers.dev` address so only insurefacts.net appears in search engines.

## 4. Connect insurefacts.net

1. **Add the domain to Cloudflare** if it isn’t there already: in the dashboard, add a domain (site), choose the Free plan, and change the nameservers at your domain registrar to the two Cloudflare nameservers you’re given. This can take a few hours to take effect. (If you bought the domain from Cloudflare Registrar, it’s already set up.)
2. Open **Workers & Pages**, select the `insurefacts` Worker, and go to its **Domains** tab (or **Settings → Domains & Routes**).
3. Select **Add → Custom Domain**, enter `insurefacts.net`, and confirm. Cloudflare creates the DNS record and the HTTPS certificate for you.
4. _Optional:_ also add `www.insurefacts.net`, then create a redirect from `www` to `insurefacts.net` under your domain’s **Rules → Redirect Rules** (there is a ready-made “Redirect from WWW to root” template). Every page also declares `https://insurefacts.net` as its canonical address.

> A Custom Domain can’t be added to a hostname that already has a CNAME DNS record. Delete any old record for `insurefacts.net` first.

## 5. Turn on Google AdSense

Ads are **off by default**: unless the variable below is set, the site contains no ad code at all.

1. **Publish your fact-checked articles first.** AdSense reviews whether a site has enough original, useful content.
2. Sign up at [Google AdSense](https://adsense.google.com) with `insurefacts.net`. Your publisher ID looks like `ca-pub-1234567890123456`.
3. Add it to Cloudflare as a **build variable** (the site reads it while building):
   - Open the `insurefacts` Worker → **Settings → Build → Build variables and secrets** → **Add**.
   - Name: `PUBLIC_ADSENSE_CLIENT`. Value: your `ca-pub-…` ID. Save.
   - _Cloudflare Pages:_ use **Settings → Variables and Secrets** instead.
4. **Redeploy** so the change takes effect: push any commit to GitHub, or retry the latest build from the Worker’s deployments/builds list.
5. Check that **https://insurefacts.net/ads.txt** shows `google.com, pub-…, DIRECT, f08c47fec0942fa0`. The AdSense script is now in the `<head>` of every page except the legal pages and the 404 page, which lets AdSense verify your site.
6. **Create an ad unit** so ads can appear in articles: in AdSense, go to **Ads → By ad unit → Display ads**, create a responsive unit, and copy its `data-ad-slot` number. Add a second build variable, `PUBLIC_ADSENSE_SLOT`, with that number, then redeploy.
7. **Keep Auto ads switched off** in AdSense. The site places at most three ads per article, only after the quick answer, in the middle of the article and after the sources. Auto ads could place ads in the header or next to buttons, which this site doesn’t allow.
8. **Set up consent messages** in AdSense under **Privacy & messaging**: create the message for European regulations (shown to visitors from the UK, EEA and Switzerland) and, if offered, the message for US state regulations. The Privacy Policy already describes this.

To test locally, put the variables in a `.env` file (copy [`.env.example`](.env.example)); never commit `.env`. If `PUBLIC_ADSENSE_CLIENT` is set but isn’t in the `ca-pub-` + 16 digits format, the build stops with an error rather than publishing broken ad code.

## 6. Set up hello@insurefacts.net (email forwarding)

Cloudflare Email Routing forwards mail for free from `hello@insurefacts.net` to your existing inbox (for example Gmail). The domain must use Cloudflare DNS (step 4).

1. In the Cloudflare dashboard, open **Email Routing** (in the current dashboard: **Compute → Email Service → Email Routing**; older dashboards show it under your domain’s **Email** menu).
2. **Onboard the domain** `insurefacts.net` and let Cloudflare add its MX, SPF and DKIM records.
3. Under **Destination addresses**, add your personal email address and click the link in the verification email Cloudflare sends.
4. Under **Routing rules**, select **Create routing rule**: email pattern `hello`, action **Send to an email**, destination your verified address. Save.
5. Test it by sending an email to `hello@insurefacts.net` from a **different** account, and check your spam folder if it doesn’t arrive.

Email Routing only receives mail. To reply as `hello@insurefacts.net`, you need a sending service; until then, replies come from your personal address.

## 7. Placeholders to replace

Run `npm run build` and then `npm run verify` at any time to list the placeholders still on the site.

| Placeholder             | Where                                                                                                                                         | Shown on                     |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `[YOUR NAME]`           | `ownerName` in [`src/data/site.ts`](src/data/site.ts)                                                                                           | About, Privacy Policy, Terms |
| `[YOUR CITY, COUNTRY]`  | `ownerLocation` in [`src/data/site.ts`](src/data/site.ts)                                                                                       | About, Privacy Policy, Terms (including the governing-law clause) |
| `[YOUR NAME]`           | `author` in each of the four draft articles in `src/content/articles/`                                                                        | Article bylines              |

Also review:

- **Policy dates** in [`src/data/legal.ts`](src/data/legal.ts): update a date whenever you change that page.
- **Legal pages** (`src/pages/privacy.astro`, `terms.astro`, `disclaimer.astro`) are sensible templates written for this site, not legal advice. Have them checked for the country you operate from, especially the governing-law clause in the Terms.
- **Editorial policy** (`src/pages/editorial-policy.astro`) says a person checks every article before publication, and mentions that AI tools may be used for research and drafting. Keep it true to how you actually work.
- **Email address** `hello@insurefacts.net` is set in `src/data/site.ts` and needs forwarding set up (step 6).

## Commands

| Command                                  | What it does                                                                                                         |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `npm install`                            | Installs everything the project needs (run once, and after updates).                                                 |
| `npm run dev`                            | Starts the local development site at http://localhost:4321, with drafts visible.                                    |
| `npm run build`                          | Builds the production site into `dist/` and creates the search index. This is what Cloudflare runs.                 |
| `npm run preview`                        | Serves the built `dist/` folder locally, with working search.                                                       |
| `npm run verify`                         | After a build: checks no drafts leaked into pages, search or the sitemap, checks ad rules, lists placeholders, and checks all internal links. |
| `npm run check:links`                    | After a build: checks every internal link, anchor and sitemap URL.                                                  |
| `npm run check:links -- --external`      | Also checks links to official sources and other sites (needs internet; some government sites block automated checks, so open any flagged links in a browser). |
| `npm run check`                          | Checks the code for TypeScript errors.                                                                              |
| `npm run format`                         | Tidies the code formatting with Prettier.                                                                           |

## Project structure

```text
src/
  content/articles/<country>/<category>/<slug>.md   Articles (see WRITING-GUIDE.md)
  content.config.ts      Article frontmatter rules (build fails if an article breaks them)
  data/
    site.ts              Site name, email, owner placeholders
    countries.ts         The four countries: intros and official sources boxes
    categories.ts        Every insurance category, its intro and official links
    glossary.ts          Glossary terms and the US/UK terminology table
    corrections.ts       The public corrections log
    legal.ts             "Last updated" dates for the policy pages
  pages/                 Every page and route (homepage, country, category, article, legal pages)
  components/            Header, footer, cards, ad slot, search dialog and other building blocks
  layouts/               Page layouts
  styles/global.css      Colours (light and dark), typography and article styles
public/                  Favicons, Open Graph image, flags, _headers
scripts/                 Link checker, build verifier and the brand-asset generator
wrangler.jsonc           Cloudflare Workers settings
pagefind.yml             Search index settings
```

Colours are defined once as CSS variables at the top of `src/styles/global.css`, with dark-mode values below them.

## Quality checks

Before each release, run:

```bash
npm run check     # TypeScript: 0 errors
npm run build     # production build
npm run verify    # drafts, ads, placeholders and internal links
```

When this project was set up, the following were also tested:

- Layout at 360px, 768px and 1280px wide, in light and dark mode, with no horizontal scrolling on any page.
- Keyboard use: skip link, mobile menu (opens with Enter, closes with Escape and returns focus), search dialog (opens with `/` or `Ctrl`/`Cmd` + `K`), and theme toggle, including with browser storage blocked.
- Search finds articles from every country, from any page.
- Drafts are absent from the production build’s pages, search index and sitemap.
- No ad code is present when `PUBLIC_ADSENSE_CLIENT` is unset; with test IDs, articles get exactly three ad slots and legal pages none.
- Lighthouse scores of 100 for Performance, Accessibility, Best Practices and SEO on the homepage, a country page, a category page, an article, the glossary and the privacy page, on mobile and desktop.

## Credits

Icons from [Lucide](https://lucide.dev) (ISC licence). Flags from [flag-icons](https://github.com/lipis/flag-icons) (MIT licence, see `public/flags/LICENSE.txt`). Inter font by Rasmus Andersson via [Fontsource](https://fontsource.org) (SIL Open Font License).
