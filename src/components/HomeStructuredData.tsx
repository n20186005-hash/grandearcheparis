const BASE_URL = 'https://www.grandearcheparis.com';
const MAPS_SHARE_URL = 'https://maps.app.goo.gl/D4CV9coWvF1NQY5DA';
const TOURISM_OFFICIAL_URL = 'https://www.visitparisregion.com/';
const HERO_IMAGE_URL = `${BASE_URL}/gallery/grandearcheparis%20(1).jpg`;
const LOCALE_PATH: Record<string, string> = { zh: '/zh', en: '/en', fr: '/fr', es: '/es' };

function entityAlternateNames(locale: string): string[] {
  if (locale === 'zh') {
    return ['拉德芳斯大拱门', 'The Great Arch of the Defense', '巴黎新凯旋门', '新凯旋门'];
  }
  if (locale === 'fr') {
    return ['La Grande Arche', 'The Great Arch of the Defense'];
  }
  if (locale === 'es') {
    return ['La Grande Arche de la Défense', 'Arco de la Defensa', 'The Great Arch of the Defense'];
  }
  return ['The Great Arch of the Defense', 'La Grande Arche'];
}

function entityDescription(locale: string): string {
  if (locale === 'zh') {
    return '拉德芳斯大拱门（The Great Arch of the Defense / Grande Arche de la Défense，又称新凯旋门）位于法国皮托（Puteaux，上塞纳省 92），是一座高 110 米的“中空”立方体钢石结构纪念碑，夜间亮灯。屋顶平台自 2023 年起已对公众关闭，但纪念碑与拉德芳斯广场可从外部免费欣赏。';
  }
  if (locale === 'fr') {
    return "La Grande Arche de la Défense (The Great Arch of the Defense) est un monument de 110 mètres d'acier et de pierre en forme de cube évidé, illuminé la nuit, situé à Puteaux (Hauts-de-Seine, 92) à l'ouest de Paris. La terrasse du toit est fermée au public depuis 2023, mais le monument et l'esplanade de La Défense restent libres d'être contemplés depuis l'extérieur.";
  }
  if (locale === 'es') {
    return 'La Grande Arche de la Défense (The Great Arch of the Defense) es un monumento de 110 metros de acero y piedra con forma de cubo hueco, iluminado por la noche, situado en Puteaux (Hauts-de-Seine, 92) al oeste de París. La terraza de la azotea está cerrada al público desde 2023, pero el monumento y la explanada de La Défense se pueden admirar gratis desde el exterior.';
  }
  return 'The Great Arch of the Defense (La Grande Arche de la Défense) is a 110-metre steel and stone monument shaped like a hollow cube, illuminated at night, standing in Puteaux (Hauts-de-Seine, 92) on the western edge of Paris. The rooftop terrace has been closed to the public since 2023, but the monument and the La Défense esplanade are free to admire from outside.';
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

function buildFaqLd(items?: { q: string; a: string }[]) {
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

export default function HomeStructuredData({ locale, questions }: { locale: string; questions?: { q: string; a: string }[] }) {
  const attractionLd = buildAttractionLd(locale);
  const faqLd = buildFaqLd(questions);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(attractionLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
    </>
  );
}
