import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FaqSection from '@/components/FaqSection';
import stays from '@/lib/art-stay.json';
import labels from '@/lib/nearby-labels';
import { NEARBY, SITE_URL, mapSearch, nearbyPath, nearestPlaces, walkingDirections } from '@/lib/nearby';

type RouteProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => NEARBY.map(({ slug }) => ({ locale, slug })));
}

async function resolvePage({ params }: RouteProps) {
  const { locale, slug } = await params;
  const loc = routing.locales.find((value) => value === locale);
  const place = NEARBY.find((value) => value.slug === slug);
  if (!loc || !place) notFound();
  return { loc, place };
}

export async function generateMetadata(props: RouteProps): Promise<Metadata> {
  const { loc, place } = await resolvePage(props);
  const copy = place.copy[loc];
  const title = `${copy.title} | Paris La Défense`;
  const path = nearbyPath(loc, place.slug);
  const languageUrls = Object.fromEntries(routing.locales.map((locale) => [locale, nearbyPath(locale, place.slug)]));
  const image = `/nearby/${place.slug}.webp`;

  return {
    title: { absolute: title },
    description: copy.story,
    alternates: { canonical: path, languages: { ...languageUrls, 'x-default': languageUrls.zh } },
    openGraph: { title, description: copy.story, url: path, images: [{ url: image, alt: copy.title }], type: 'article' },
    twitter: { card: 'summary_large_image', title, description: copy.story, images: [image] },
  };
}

function questions(locale: Locale, title: string) {
  const t = labels[locale];
  if (locale === 'zh') return [`${t.where}${title}？`, `${t.view}${title}更合适？`, `${title}${t.admission}？`];
  const mark = locale === 'fr' ? ' ?' : '?';
  return [t.where, t.view, t.admission].map((question) => `${question} ${title}${mark}`);
}

export default async function NearbyPage(props: RouteProps) {
  const { loc, place } = await resolvePage(props);
  setRequestLocale(loc);
  const t = labels[loc];
  const copy = place.copy[loc];
  const map = mapSearch(place);
  const direction = walkingDirections(place);
  const directory = `/${loc}#nearby`;
  const pin = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.coordinates)}`;
  const nearby = nearestPlaces(place);
  const station = place.slug === 'bas-relief-en-cuivre';
  const passage = place.slug === 'anamorphose';
  const manager = ({
    'bas-relief-en-cuivre': t.stationManager,
    anamorphose: t.passageManager,
    apseil: t.parkingManager,
    'fragments-berlin-wall': t.wallManager,
    cromawaltz: t.privateManager,
    'personnages-fantastiques': t.privateManager,
    'hercules-wind': t.privateManager,
  } as Record<string, string>)[place.slug] ?? t.publicManager;
  const hours = station ? t.stationAccess : passage ? t.passageAccess : t.outdoorHours;
  const access = station ? t.stationAccess : passage ? t.passageAccess : t.publicAccess;
  const ticket = station ? t.stationTicket : passage ? t.passageTicket : t.free;
  const location = `${place.name} · ${place.district} · Paris La Défense`;
  const [where, view, admission] = questions(loc, copy.title);
  const faq = [
    { q: where, a: `${location}. ${access}` },
    { q: view, a: copy.view },
    { q: admission, a: ticket },
    { q: copy.question, a: copy.answer },
  ];
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.home, item: `${SITE_URL}/${loc}` },
      { '@type': 'ListItem', position: 2, name: t.directory, item: `${SITE_URL}${directory}` },
      { '@type': 'ListItem', position: 3, name: copy.title, item: `${SITE_URL}${nearbyPath(loc, place.slug)}` },
    ],
  };

  return (
    <>
      <Header interior />
      <main>
        <section className="relative min-h-[55vh] flex items-end overflow-hidden pt-28 pb-12 sm:pb-16">
          <img src={`/nearby/${place.slug}-wide.webp`} alt={copy.caption} width="1150" height="575" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{background:'linear-gradient(to top, rgba(9,22,17,.94), rgba(9,22,17,.16)), var(--hero-overlay)'}} />
          <div className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6 text-white">
            <nav className="mb-4 text-sm"><Link className="underline" href={directory}>{t.directory}</Link></nav>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold">{copy.title}</h1>
            <p className="mt-3 max-w-3xl text-lg leading-relaxed">{copy.story}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <a className="underline" href="#access">{t.access}</a>
              <a className="underline" href={pin}>{t.officialPin}</a>
              <a className="underline" href={map}>{t.reviews}</a>
            </div>
          </div>
        </section>
        <article className="mx-auto max-w-5xl px-4 sm:px-6 pb-16">
          <section className="mt-8 space-y-3 rounded-xl border p-5" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
            <h2 className="font-display text-2xl font-semibold">{t.about} · {copy.title}</h2>
            <p>{manager}</p>
            <p>{copy.history}</p>
          </section>

          <section className="mt-8">
            <h2 className="font-display text-2xl font-semibold">{t.facts}</h2>
            <dl className="mt-3 grid gap-x-4 gap-y-3 text-sm sm:grid-cols-[auto_1fr]">
              <dt className="font-semibold">{t.name}</dt><dd>{place.name}</dd>
              <dt className="font-semibold">{t.area}</dt><dd>{place.district} · Paris La Défense</dd>
              {place.artist && <><dt className="font-semibold">{t.artist}</dt><dd>{place.artist}</dd></>}
              <dt className="font-semibold">{t.material}</dt><dd>{copy.material}</dd>
              <dt className="font-semibold">{t.installed}</dt><dd>{place.installed}</dd>
              <dt className="font-semibold">{t.duration}</dt><dd>{t.stop}</dd>
              <dt className="font-semibold">{t.access}</dt><dd>{access}</dd>
              <dt className="font-semibold">{t.ticket}</dt><dd>{ticket}</dd>
            </dl>
          </section>

          <section id="access" className="mt-8 scroll-mt-20">
            <h2 className="font-display text-2xl font-semibold">{t.access}</h2><p className="mt-3">{hours}</p>
          </section>
          <section className="mt-8">
            <h2 className="font-display text-2xl font-semibold">{t.ticket}</h2><p className="mt-3">{ticket}</p>
          </section>
          <section className="mt-8">
            <h2 className="font-display text-2xl font-semibold">{t.getting}</h2><p className="mt-3">{copy.approach}</p>
            <a href="https://www.parisladefense.com/en/practical-informations/directions/how-get-paris-defense-public-transport" className="mt-2 inline-block underline">{t.transport}</a>
          </section>
          <section className="mt-8">
            <h2 className="font-display text-2xl font-semibold">{t.reading}</h2><p className="mt-3">{copy.interpretation}</p>
          </section>
          <section className="mt-8">
            <h2 className="font-display text-2xl font-semibold">{t.route}</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5">
              <li>{copy.walk}</li>
              <li>{copy.view}</li>
              <li>{t.nextWalk} · <Link className="underline" style={{ color: 'var(--accent)' }} href={nearbyPath(loc, nearby[0].slug)}>{nearby[0].copy[loc].title}</Link></li>
            </ol>
            <a className="mt-3 inline-block underline" href={direction}>{t.directions}</a>
          </section>

          <section className="mt-8">
            <h2 className="font-display text-2xl font-semibold">{t.planning}</h2><p className="mt-3">{station || passage ? access : t.stopNote}</p>
          </section>
          <section id="gallery" className="mt-8 scroll-mt-20">
            <h2 className="font-display text-2xl font-semibold">{t.photo}</h2>
            <figure className="mt-3">
              <img src={`/nearby/${place.slug}.webp`} width="414" height="207" loading="lazy" className="w-full rounded-xl" alt={copy.caption} />
              <figcaption className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>{copy.caption} · © {place.credit}</figcaption>
            </figure>
            <h3 className="font-display text-xl font-semibold mt-5">{t.angles}</h3>
            <p className="mt-2">{copy.view}</p><p className="mt-2">{copy.secondView}</p>
          </section>

          <section className="mt-8">
            <h2 className="font-display text-2xl font-semibold">{t.lodging}</h2>
            <p className="mt-2">{stays[place.stayZone][loc]}</p>
          </section>

          <FaqSection title={t.faq} items={faq} />

          <section id="map" className="mt-8 scroll-mt-20">
            <h2 id="reviews" className="scroll-mt-20 text-xl font-semibold">{t.map}</h2>
            <p className="mt-2">{location}</p>
            <iframe className="mt-3 h-72 w-full rounded-xl border" title={`${t.officialPin} · ${copy.title}`} src={`https://maps.google.com/maps?q=${encodeURIComponent(place.coordinates)}&z=17&hl=${loc}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            <p className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              <a className="underline" style={{ color: 'var(--accent)' }} href={map}>{t.reviews}</a>
              <a className="underline" style={{ color: 'var(--accent)' }} href={place.source}>{t.source}</a>
            </p>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>{t.checked}</p>
          </section>

          <section className="mt-8 rounded-xl border p-5" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
            <h2 className="font-display text-2xl font-semibold">{t.related}</h2>
            <ul className="mt-3 space-y-2" style={{ color: 'var(--accent)' }}>
              {nearby.map((other) => (
                <li key={other.slug}><Link className="underline" href={nearbyPath(loc, other.slug)}>{other.copy[loc].title}</Link></li>
              ))}
              <li><Link className="underline" href={directory}>{t.directory}</Link></li>
            </ul>
          </section>
        </article>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
