import { getMessages } from 'next-intl/server';

type StoryItem = { title: string; text: string };
type TimelineEntry = { year: string; text: string };
type FactItem = { value: string; label: string };

type StoriesTexts = {
  title: string;
  subtitle?: string;
  timelineLabel?: string;
  timeline: TimelineEntry[];
  storiesLabel?: string;
  stories: StoryItem[];
  factsLabel?: string;
  facts: FactItem[];
};

export default async function StoriesSection() {
  const messages = (await getMessages()) as { stories?: StoriesTexts };
  const s = messages.stories;

  if (!s || (!s.timeline?.length && !s.stories?.length && !s.facts?.length)) {
    return null;
  }

  return (
    <section id="stories" className="section-padding" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="mx-auto max-w-5xl">
        <h2
          className="font-display mb-2 text-3xl font-semibold sm:text-4xl"
          style={{ color: 'var(--text-primary)' }}
        >
          {s.title}
        </h2>
        {s.subtitle ? (
          <p className="mb-8 max-w-3xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {s.subtitle}
          </p>
        ) : null}
        <div className="mb-10 h-0.5 w-12" style={{ background: 'var(--accent)' }} />

        {s.timeline?.length ? (
          <div className="mb-12">
            {s.timelineLabel ? (
              <h3 className="font-display mb-6 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                {s.timelineLabel}
              </h3>
            ) : null}
            <div className="relative">
              <div
                className="absolute bottom-2 left-[7px] top-2 w-0.5"
                style={{ background: 'var(--border-color)' }}
              />
              <div className="space-y-6">
                {s.timeline.map((entry, i) => (
                  <div key={i} className="relative flex gap-5">
                    <span
                      className="mt-1.5 h-3.5 w-3.5 flex-shrink-0 rounded-full border-2"
                      style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--accent)' }}
                    />
                    <div className="flex-1 rounded-xl p-4 sm:p-5" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}>
                      <p className="mb-1 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                        {entry.year}
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {entry.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {s.stories?.length ? (
          <div className="mb-12">
            {s.storiesLabel ? (
              <h3 className="font-display mb-6 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                {s.storiesLabel}
              </h3>
            ) : null}
            <div className="grid gap-5 sm:grid-cols-2">
              {s.stories.map((story, i) => (
                <div
                  key={i}
                  className="rounded-xl p-5 sm:p-6"
                  style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}
                >
                  <h4 className="font-display mb-2 text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {story.title}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {story.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {s.facts?.length ? (
          <div>
            {s.factsLabel ? (
              <h3 className="font-display mb-6 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                {s.factsLabel}
              </h3>
            ) : null}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {s.facts.map((fact, i) => (
                <div
                  key={i}
                  className="rounded-xl border p-5 text-center"
                  style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
                >
                  <p className="font-display text-2xl font-bold" style={{ color: 'var(--accent)' }}>
                    {fact.value}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {fact.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
