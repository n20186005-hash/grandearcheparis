import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

const BASE_URL = 'https://www.grandearcheparis.com';
const GA_MEASUREMENT_ID = 'G-HXM22WWPKP';
const MAPS_SHARE_URL = 'https://maps.app.goo.gl/D4CV9coWvF1NQY5DA';
const TOURISM_OFFICIAL_URL = 'https://www.visitparisregion.com/';
const HERO_IMAGE_URL = `${BASE_URL}/gallery/grandearcheparis%20(1).jpg`;

const LOCALE_PATH: Record<string, string> = { zh: '/zh', en: '/en', fr: '/fr' };
const HTML_LANG: Record<string, string> = { zh: 'zh-CN', en: 'en', fr: 'fr' };
const OG_LOCALE: Record<string, string> = { zh: 'zh_CN', en: 'en_US', fr: 'fr_FR' };
const SITE_NAME: Record<string, string> = {
  zh: '拉德芳斯大拱门 | The Great Arch of the Defense',
  en: 'The Great Arch of the Defense',
  fr: 'La Grande Arche de la Défense',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const safeLocale = routing.locales.includes(locale as any) ? locale : 'zh';
  const localePath = LOCALE_PATH[safeLocale] ?? '/zh';

  const zhUrl = `${BASE_URL}/zh`;
  const enUrl = `${BASE_URL}/en`;
  const frUrl = `${BASE_URL}/fr`;
  const selfUrl = `${BASE_URL}${localePath}`;

  return {
    metadataBase: new URL(BASE_URL),
    title: messages.meta.title,
    description: messages.meta.description,
    alternates: {
      canonical: selfUrl,
      languages: {
        'zh': zhUrl,
        'en': enUrl,
        'fr': frUrl,
        'x-default': zhUrl,
      },
    },
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: selfUrl,
      siteName: SITE_NAME[safeLocale] ?? SITE_NAME.zh,
      locale: OG_LOCALE[safeLocale] ?? OG_LOCALE.zh,
      type: 'website',
      images: [
        {
          url: HERO_IMAGE_URL,
          alt: messages.hero?.imageAlt ?? messages.meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.meta.title,
      description: messages.meta.description,
      images: [HERO_IMAGE_URL],
    },
  };
}

function entityAlternateNames(locale: string): string[] {
  if (locale === 'zh') {
    return ['拉德芳斯大拱门', 'The Great Arch of the Defense', '巴黎新凯旋门', '新凯旋门'];
  }
  if (locale === 'fr') {
    return ['La Grande Arche', 'The Great Arch of the Defense'];
  }
  return ['The Great Arch of the Defense', 'La Grande Arche'];
}

function entityDescription(locale: string): string {
  if (locale === 'zh') {
    return '拉德芳斯大拱门（The Great Arch of the Defense / Grande Arche de la Défense，又称新凯旋门）位于法国皮托（Puteaux，上塞纳省 92），是一座高 110 米的“中空”立方体钢石结构纪念碑，夜间亮灯，顶部可观 360° 巴黎全景。';
  }
  if (locale === 'fr') {
    return "La Grande Arche de la Défense (The Great Arch of the Defense) est un monument de 110 mètres d'acier et de pierre en forme de cube évidé, illuminé la nuit, situé à Puteaux (Hauts-de-Seine, 92) à l'ouest de Paris, avec un toit panoramique à 360°.";
  }
  return 'The Great Arch of the Defense (La Grande Arche de la Défense) is a 110-metre steel and stone monument shaped like a hollow cube, illuminated at night, standing in Puteaux (Hauts-de-Seine, 92) on the western edge of Paris.';
}

function buildAttractionLd(locale: string) {
  const localePath = LOCALE_PATH[locale] ?? '/zh';
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${BASE_URL}${localePath}/#attraction`,
    additionalType: 'https://schema.org/LandmarksOrHistoricalBuildings',
    name: 'La Grande Arche de la Défense',
    alternateName: entityAlternateNames(locale),
    description: entityDescription(locale),
    url: BASE_URL,
    image: [HERO_IMAGE_URL],
    isAccessibleForFree: true,
    publicAccess: true,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1 Parvis de la Défense',
      addressLocality: 'Puteaux',
      addressRegion: 'Hauts-de-Seine',
      postalCode: '92800',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.8925978,
      longitude: 2.2361121,
    },
    hasMap: MAPS_SHARE_URL,
    sameAs: [MAPS_SHARE_URL, TOURISM_OFFICIAL_URL],
  };
}

function buildFaqLd(locale: string, messages: any) {
  const items = messages?.faq?.items;
  if (!Array.isArray(items) || items.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item: { q: string; a: string }) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const attractionLd = buildAttractionLd(locale);
  const faqLd = buildFaqLd(locale, messages);

  return (
    <html lang={HTML_LANG[locale] ?? 'zh-CN'} suppressHydrationWarning>
      <head>
        {/* Google AdSense (replace ca-pub-XXXXXXXXXX with the real publisher ID) */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous" />
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXX" />

        {/* Google Analytics 4 – G-HXM22WWPKP (consent-aware) */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'analytics_storage': 'denied',
                'functionality_storage': 'granted',
                'personalization_storage': 'denied',
                'security_storage': 'granted'
              });
              try {
                var prefs = JSON.parse(localStorage.getItem('cookiePrefs') || '{}');
                if (prefs.analytics) gtag('consent', 'update', {'analytics_storage': 'granted'});
                if (prefs.marketing) gtag('consent', 'update', {'ad_storage': 'granted', 'personalization_storage': 'granted'});
              } catch(e) {}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {'anonymize_ip': true});
            `,
          }}
        />

        {/* PWA / web app meta */}
        <meta name="theme-color" content="#234830" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Grande Arche" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Theme init (dark mode) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        {/* Structured data: TouristAttraction entity + FAQPage (server-rendered) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(attractionLd) }}
        />
        {faqLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
          />
        )}
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
