import Link from 'next/link';
import { TOPICS, topicPath, type Locale } from '@/lib/topics';

export default function TopicLinks({ locale }: { locale: Locale }) {
  const heading =
    locale === 'zh' ? '实用指南' : locale === 'fr' ? 'Guides pratiques' : locale === 'es' ? 'Guías prácticas' : 'Practical guides';
  const subtitle =
    locale === 'zh'
      ? '围绕真实参观需求整理的独立指南'
      : locale === 'fr'
        ? 'Des guides indépendants autour de la visite réelle'
        : locale === 'es'
          ? 'Guías independientes centradas en dudas reales de visita'
          : 'Independent guides built around real visit questions';

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h2 className="text-2xl font-bold tracking-tight">{heading}</h2>
      <p className="mt-2 text-muted-foreground">{subtitle}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {TOPICS.map((t) => (
          <Link
            key={t.key}
            href={topicPath(locale, t.key)}
            className="group rounded-xl border border-border bg-card p-5 transition hover:border-primary"
          >
            <h3 className="font-semibold group-hover:text-primary">
              {t.content[locale].title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t.content[locale].metaDescription}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
