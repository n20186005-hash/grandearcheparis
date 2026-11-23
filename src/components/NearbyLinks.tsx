import Link from 'next/link';
import type { Locale } from '@/i18n/routing';
import { NEARBY, nearbyPath } from '@/lib/nearby';
import labels from '@/lib/nearby-labels';

export default function NearbyLinks({ locale }: { locale: Locale }) {
  const text = labels[locale];
  return (
    <section id="nearby" className="scroll-mt-20 mx-auto max-w-5xl px-4 py-12">
      <h2 className="text-2xl font-bold tracking-tight">{text.directory}</h2>
      <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>{text.intro}</p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {NEARBY.map((place) => (
          <li key={place.slug}>
            <Link href={nearbyPath(locale, place.slug)} prefetch={false} className="group block h-full rounded-xl border p-5 transition hover:shadow-md" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
              <h3 className="font-semibold group-hover:underline">{place.copy[locale].title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{place.copy[locale].story}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
