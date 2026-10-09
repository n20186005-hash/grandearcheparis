import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import CookieSettingsClient from './CookieSettingsClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://www.grandearcheparis.com';
  const zhUrl = `${baseUrl}/`;
  const enUrl = `${baseUrl}/en/cookie-settings`;
  const frUrl = enUrl.replace('/en/', '/fr/');
  const esUrl = enUrl.replace('/en/', '/es/');
  const selfUrl = locale === 'zh' ? zhUrl : locale === 'en' ? enUrl : locale === 'fr' ? frUrl : esUrl;

  return {
    alternates: {
      canonical: selfUrl,
      languages: {
        'zh': zhUrl,
        'en': enUrl,
        'fr': frUrl,
        'es': esUrl,
        'x-default': zhUrl,
      },
    },
  };
}

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CookieSettingsClient />;
}
