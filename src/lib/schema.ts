// JSON-LD structured data builders (https://schema.org).
import { site } from '../data/site';

export type JsonLd = Record<string, unknown>;

export interface Crumb {
  name: string;
  /** Root-relative path, e.g. "/uk/". Omit for the current page. */
  href?: string;
}

const absolute = (path: string) => new URL(path, site.url).href;

export function organizationSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.name,
    url: `${site.url}/`,
    logo: absolute('/icons/icon-512.png'),
    email: site.email,
    description: site.description,
  };
}

export function websiteSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name,
    url: `${site.url}/`,
    inLanguage: 'en',
    publisher: { '@id': `${site.url}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${site.url}/search/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbSchema(crumbs: Crumb[], currentPath: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absolute(crumb.href ?? currentPath),
    })),
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  author: string;
  publishedDate: Date;
  updatedDate: Date;
  lang: string;
  sourceUrls: string[];
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    url: absolute(input.path),
    mainEntityOfPage: absolute(input.path),
    inLanguage: input.lang,
    datePublished: input.publishedDate.toISOString(),
    dateModified: input.updatedDate.toISOString(),
    author: { '@type': 'Person', name: input.author },
    publisher: {
      '@type': 'Organization',
      '@id': `${site.url}/#organization`,
      name: site.name,
      logo: { '@type': 'ImageObject', url: absolute('/icons/icon-512.png') },
    },
    image: absolute('/og-default.png'),
    citation: input.sourceUrls,
  };
}
