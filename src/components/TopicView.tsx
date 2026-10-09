import Link from 'next/link';
import type { Topic, Locale } from '@/lib/topics';
import { TOPICS, topicPath } from '@/lib/topics';
import FaqSection from '@/components/FaqSection';

const ORDER: Topic['key'][] = ['visiting', 'rooftop-closed', 'getting-there'];

export default function TopicView({
  locale,
  topic,
  content,
}: {
  locale: Locale;
  topic: Topic;
  content: Topic['content'][Locale];
}) {
  const related = ORDER.filter((k) => k !== topic.key);

  const relatedLinks = related.map((k) => {
    const t = TOPICS.find((x) => x.key === k)!;
    return { href: topicPath(locale, k), title: t.content[locale].title };
  });

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href={`/${locale}`} className="hover:underline">
          {locale === 'zh'
            ? '首页'
            : locale === 'fr'
              ? 'Accueil'
              : locale === 'es'
                ? 'Inicio'
                : 'Home'}
        </Link>{' '}
        <span aria-hidden>·</span>{' '}
        <span>
          {locale === 'zh'
            ? '拉德芳斯大拱门'
            : locale === 'es'
              ? 'La Grande Arche de la Défense'
              : 'Grande Arche de la Défense'}
        </span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{content.title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{content.intro}</p>

      <div className="mt-8 space-y-8">
        {content.sections.map((section, i) => (
          <section key={i}>
            <h2 className="text-xl font-semibold">{section.heading}</h2>
            <p className="mt-2 leading-relaxed">{section.body}</p>
          </section>
        ))}
      </div>

      <FaqSection
        title={
          locale === 'zh'
            ? '常见问题'
            : locale === 'fr'
              ? 'Questions fréquentes'
              : locale === 'es'
                ? 'Preguntas frecuentes'
                : 'Frequently asked questions'
        }
        subtitle=""
        items={content.faq}
      />

      <section className="mt-10 rounded-xl border border-border bg-muted/40 p-6">
        <h2 className="text-lg font-semibold">
          {locale === 'zh'
            ? '相关指南'
            : locale === 'fr'
              ? 'Guides liés'
              : locale === 'es'
                ? 'Guías relacionadas'
                : 'Related guides'}
        </h2>
        <ul className="mt-3 space-y-2">
          {relatedLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-primary hover:underline">
                {l.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
