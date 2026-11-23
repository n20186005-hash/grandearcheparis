import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

const BASE_URL = 'https://www.grandearcheparis.com';
const GA_MEASUREMENT_ID = 'G-HXM22WWPKP';
const HERO_IMAGE_URL = `${BASE_URL}/gallery/grandearcheparis%20(1).jpg`;

const LOCALE_PATH: Record<string, string> = { zh: '/zh', en: '/en', fr: '/fr', es: '/es' };
const HTML_LANG: Record<string, string> = { zh: 'zh-CN', en: 'en', fr: 'fr', es: 'es' };
const OG_LOCALE: Record<string, string> = { zh: 'zh_CN', en: 'en_US', fr: 'fr_FR', es: 'es_ES' };
const SITE_NAME: Record<string, string> = {
  zh: '拉德芳斯大拱门 | The Great Arch of the Defense',
  en: 'The Great Arch of the Defense',
  fr: 'La Grande Arche de la Défense',
  es: 'La Grande Arche de la Défense',
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
  const safeLocale = routing.locales.find((candidate) => candidate === locale);
  if (!safeLocale) notFound();
  const messages = (await import(`@/messages/${safeLocale}.json`)).default;
  const localePath = LOCALE_PATH[safeLocale] ?? '/zh';

  const zhUrl = `${BASE_URL}/zh`;
  const enUrl = `${BASE_URL}/en`;
  const frUrl = `${BASE_URL}/fr`;
  const esUrl = `${BASE_URL}/es`;
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
        'es': esUrl,
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
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
