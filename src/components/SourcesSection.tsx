export interface SourceLink {
  label: string;
  url: string;
}

export default function SourcesSection({
  title,
  intro,
  breadcrumb,
  nearby,
  items,
  note,
}: {
  title: string;
  intro?: string;
  breadcrumb?: string;
  nearby?: string;
  items?: SourceLink[];
  note?: string;
}) {
  return (
    <section
      id="sources"
      className="section-padding"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2
          className="mb-2 text-3xl font-bold md:text-4xl"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h2>
        <div className="mb-5 h-0.5 w-12 rounded-full bg-green-600" />
        {intro ? (
          <p
            className="mb-5 leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {intro}
          </p>
        ) : null}
        {breadcrumb ? (
          <div
            className="mb-6 rounded-xl px-4 py-3 text-sm font-medium leading-relaxed"
            style={{
              background: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
            }}
          >
            {breadcrumb}
          </div>
        ) : null}
        {nearby ? (
          <p
            className="mb-8 leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {nearby}
          </p>
        ) : null}
        {items && items.length > 0 ? (
          <ul className="grid gap-3 sm:grid-cols-2">
            {items.map((item, index) => (
              <li key={index}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full items-start justify-between gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-opacity hover:opacity-80"
                  style={{
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                    background: 'var(--bg-primary)',
                  }}
                >
                  <span className="leading-snug">{item.label}</span>
                  <span aria-hidden="true" className="flex-shrink-0">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
        {note ? (
          <p
            className="mt-6 text-sm leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {note}
          </p>
        ) : null}
      </div>
    </section>
  );
}
