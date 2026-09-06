export interface FaqItem {
  q: string;
  a: string;
}

export default function FaqSection({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle?: string;
  items: FaqItem[];
}) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section id="faq" className="section-padding">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2
          className="mb-2 text-center text-3xl font-bold md:text-4xl"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h2>
        <div className="mx-auto mb-8 h-0.5 w-12 rounded-full bg-green-600" />
        {subtitle ? (
          <p
            className="mx-auto mb-10 max-w-2xl text-center leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {subtitle}
          </p>
        ) : null}
        <div className="faq-list">
          {items.map((item, index) => (
            <details key={index}>
              <summary>{item.q}</summary>
              <div className="faq-answer">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
