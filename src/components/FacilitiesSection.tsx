import { getMessages } from 'next-intl/server';

type Card = { icon: string; title: string; text: string };
type FacilitiesTexts = { title: string; subtitle: string; cards: Card[]; note?: string };

function CardIcon({ icon }: { icon: string }) {
  return (
    <div
      aria-hidden="true"
      className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full"
      style={{ background: 'var(--tag-bg)' }}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: 'var(--accent)' }}
      >
        {icon === 'wc' ? (
          <>
            <circle cx="7" cy="7" r="2.4" />
            <path d="M3.5 18c.5-3 1.7-4.5 3.5-4.5s3 1.5 3.5 4.5" />
            <circle cx="17" cy="7" r="2.4" />
            <path d="M13.5 18c.5-3 1.7-4.5 3.5-4.5s3 1.5 3.5 4.5" />
          </>
        ) : icon === 'parking' ? (
          <>
            <rect x="4" y="3" width="16" height="18" rx="2" />
            <path d="M9 17V7h3.6a2.6 2.6 0 0 1 0 5.2H9" />
          </>
        ) : icon === 'food' ? (
          <>
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
            <path d="M7 2v20" />
            <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
          </>
        ) : icon === 'shopping' ? (
          <>
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </>
        ) : icon === 'fuel' ? (
          <>
            <line x1="3" y1="22" x2="15" y2="22" />
            <path d="M4 22V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8" />
            <path d="M14 12h2a2 2 0 0 1 2 2v3a2 2 0 0 0 4 0V9l-4-4" />
            <circle cx="8" cy="8" r="1" />
          </>
        ) : (
          <>
            <path d="M2 5v16" />
            <path d="M2 9h17a2 2 0 0 1 2 2v10" />
            <path d="M2 18h19" />
            <path d="M7 9V6a2 2 0 0 1 2-2h4a1 1 0 0 1 0 2" />
          </>
        )}
      </svg>
    </div>
  );
}

export default async function FacilitiesSection() {
  const messages = (await getMessages()) as { facilities?: FacilitiesTexts };
  const f = messages.facilities;

  if (!f || !f.cards?.length) {
    return null;
  }

  return (
    <section id="facilities" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="mx-auto max-w-5xl">
        <h2
          className="font-display mb-2 text-3xl font-semibold sm:text-4xl"
          style={{ color: 'var(--text-primary)' }}
        >
          {f.title}
        </h2>
        <p className="mb-6 text-sm" style={{ color: 'var(--text-muted)' }}>
          {f.subtitle}
        </p>
        <div className="mb-10 h-0.5 w-12" style={{ background: 'var(--accent)' }} />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {f.cards.map((card) => (
            <div
              key={card.icon}
              className="rounded-xl p-5"
              style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}
            >
              <div className="mb-4 flex items-center gap-3">
                <CardIcon icon={card.icon} />
                <h3
                  className="font-display text-lg font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {card.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {card.text}
              </p>
            </div>
          ))}
        </div>

        {f.note ? (
          <p className="mt-6 text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {f.note}
          </p>
        ) : null}
      </div>
    </section>
  );
}
