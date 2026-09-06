import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.grandearcheparis.com';

const HOMES: Array<{ path: string; priority: number }> = [
  { path: '/zh', priority: 1 },
  { path: '/en', priority: 0.9 },
  { path: '/fr', priority: 0.8 },
];

const LEGAL_PAGES = ['/privacy-policy', '/terms-of-service', '/cookie-settings'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const homeEntries: MetadataRoute.Sitemap = HOMES.map((home) => ({
    url: `${BASE_URL}${home.path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: home.priority,
  }));

  const legalEntries: MetadataRoute.Sitemap = HOMES.flatMap((home) =>
    LEGAL_PAGES.map((page) => ({
      url: `${BASE_URL}${home.path}${page}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    })),
  );

  return [...homeEntries, ...legalEntries];
}
