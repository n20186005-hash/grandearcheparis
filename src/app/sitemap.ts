import type { MetadataRoute } from 'next';
import { TOPICS, topicHreflangUrls, type Locale } from '@/lib/topics';

const BASE_URL = 'https://www.grandearcheparis.com';
const LOCALES: Locale[] = ['zh', 'en', 'fr', 'es'];

const HOMES: Array<{ path: string; priority: number }> = [
  { path: '/zh', priority: 1 },
  { path: '/en', priority: 0.9 },
  { path: '/fr', priority: 0.8 },
  { path: '/es', priority: 0.7 },
];

const LEGAL_PAGES = ['/privacy-policy', '/terms-of-service', '/cookie-settings'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const homeEntries: MetadataRoute.Sitemap = HOMES.map((home) => ({
    url: `${BASE_URL}${home.path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: home.priority,
    alternates: {
      languages: {
        zh: `${BASE_URL}/zh`,
        en: `${BASE_URL}/en`,
        fr: `${BASE_URL}/fr`,
        es: `${BASE_URL}/es`,
        'x-default': `${BASE_URL}/zh`,
      },
    },
  }));

  const legalEntries: MetadataRoute.Sitemap = HOMES.flatMap((home) =>
    LEGAL_PAGES.map((page) => ({
      url: `${BASE_URL}${home.path}${page}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
      alternates: {
        languages: {
          zh: `${BASE_URL}/zh${page}`,
          en: `${BASE_URL}/en${page}`,
          fr: `${BASE_URL}/fr${page}`,
          es: `${BASE_URL}/es${page}`,
          'x-default': `${BASE_URL}/zh${page}`,
        },
      },
    })),
  );

  const topicEntries: MetadataRoute.Sitemap = TOPICS.flatMap((topic) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}/${topic.slugs[locale]}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: { languages: topicHreflangUrls(topic.key) },
    })),
  );

  return [...homeEntries, ...legalEntries, ...topicEntries];
}
