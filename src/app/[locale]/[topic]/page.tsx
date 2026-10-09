import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import {
  TOPICS,
  topicPath,
  resolveTopic,
  topicHreflangUrls,
  type Locale,
} from '@/lib/topics';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopicView from '@/components/TopicView';

const BASE_URL = 'https://www.grandearcheparis.com';
const MAPS_SHARE_URL = 'https://maps.app.goo.gl/D4CV9coWvF1NQY5DA';

export function generateStaticParams() {
  const params: { locale: string; topic: string }[] = [];
  for (const locale of routing.locales) {
    for (const t of TOPICS) {
      params.push({ locale, topic: t.slugs[locale as Locale] });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; topic: string }>;
}): Promise<Metadata> {
  const { locale, topic } = await params;
  const hit = resolveTopic(locale, topic);
  if (!hit) return {};
  const { topic: t, locale: loc } = hit;
  const content = t.content[loc];
  const selfUrl = `${BASE_URL}/${loc}/${t.slugs[loc]}`;
  const hreflang = topicHreflangUrls(t.key);

  return {
    metadataBase: new URL(BASE_URL),
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: selfUrl,
      languages: hreflang,
    },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: selfUrl,
      type: 'article',
      locale: loc === 'zh' ? 'zh_CN' : loc === 'fr' ? 'fr_FR' : loc === 'es' ? 'es_ES' : 'en_US',
    },
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ locale: string; topic: string }>;
}) {
  const { locale, topic } = await params;

  if (!routing.locales.includes(locale as any)) notFound();
  const hit = resolveTopic(locale, topic);
  if (!hit) notFound();

  setRequestLocale(locale);
  const { topic: t, locale: loc } = hit;
  const content = t.content[loc];

  const selfUrl = `${BASE_URL}/${loc}/${t.slugs[loc]}`;
  const hreflang = topicHreflangUrls(t.key);

  const faqLd =
    content.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: content.faq.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        }
      : null;

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: loc === 'zh' ? '首页' : loc === 'fr' ? 'Accueil' : loc === 'es' ? 'Inicio' : 'Home',
        item: `${BASE_URL}/${loc}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: content.title,
        item: selfUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      <Header />
      <main>
        <TopicView locale={loc} topic={t} content={content} />
      </main>
      <Footer />
    </>
  );
}
