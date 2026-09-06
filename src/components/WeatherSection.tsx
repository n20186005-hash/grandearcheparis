import { getMessages } from 'next-intl/server';

export type WeatherCodes = Record<string, string>;

export type WeatherSuggest = {
  dressLabel: string;
  planLabel: string;
  gearLabel: string;
  riskLabel: string;
  dress: Record<string, string>;
  plan: Record<string, string>;
  items: Record<string, string>;
  risks: Record<string, string>;
};

export type WeatherTexts = {
  title: string;
  subtitle?: string;
  updated: string;
  current: string;
  feelsLike: string;
  humidity: string;
  wind: string;
  precip: string;
  todayHigh: string;
  todayLow: string;
  disclaimer?: string;
  codes: WeatherCodes;
  suggest?: WeatherSuggest;
};

type Daily = {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: (number | null)[];
  uv_index_max?: (number | null)[];
  wind_speed_10m_max?: (number | null)[];
};

type ForecastPayload = {
  current?: {
    time?: string;
    temperature_2m?: number;
    relative_humidity_2m?: number;
    apparent_temperature?: number;
    weather_code?: number;
    wind_speed_10m?: number;
    uv_index?: number;
  };
  daily?: Daily;
};

type Advice = { dress: string[]; plan: string[]; gear: string[]; risk: string[] };

const LATITUDE = 48.8925978;
const LONGITUDE = 2.2361121;

const isBetween = (code: number, a: number, b: number) => code >= a && code <= b;
const RAIN_NOW = (code: number) => isBetween(code, 51, 67) || isBetween(code, 80, 82);
const SNOW_NOW = (code: number) => isBetween(code, 71, 77) || isBetween(code, 85, 86);
const HEAVY_NOW = (code: number) => [55, 57, 65, 67, 82].includes(code);
const STORM_NOW = (code: number) => code >= 95;
const FOG_NOW = (code: number) => code === 45 || code === 48;

function buildAdvice(input: {
  curT: number;
  minT: number;
  maxT: number;
  codeNow: number;
  codeDay: number;
  pop: number;
  windNow: number;
  windMax: number;
  uv: number;
}): Advice {
  const { curT, minT, maxT, codeNow, codeDay, pop, windNow, windMax, uv } = input;
  const advice: Advice = { dress: [], plan: [], gear: [], risk: [] };
  const pushUnique = (target: string[], id: string) => {
    if (!target.includes(id)) target.push(id);
  };

  const rainNow = RAIN_NOW(codeNow);
  const rainDay = RAIN_NOW(codeDay);
  const snowNow = SNOW_NOW(codeNow);
  const snowDay = SNOW_NOW(codeDay);
  const stormNow = STORM_NOW(codeNow);
  const stormDay = STORM_NOW(codeDay);
  const heavyNow = HEAVY_NOW(codeNow) || stormNow;
  const heavyDay = HEAVY_NOW(codeDay) || stormDay;
  const fog = FOG_NOW(codeNow) || FOG_NOW(codeDay);
  const precipToday = rainNow || rainDay || snowNow || snowDay;
  const wind = Math.max(windNow, windMax);

  // -- Risk (highest priority) --
  if (stormNow || stormDay) pushUnique(advice.risk, 'storm');
  if (heavyNow || heavyDay) pushUnique(advice.risk, 'heavyRain');
  if (wind >= 50) pushUnique(advice.risk, 'strongWind');
  if (fog) pushUnique(advice.risk, 'fog');

  // -- What to wear --
  if (maxT >= 30 || curT >= 30) pushUnique(advice.dress, 'light');
  if (heavyNow || heavyDay) pushUnique(advice.dress, 'waterproof');
  if (maxT <= 8) pushUnique(advice.dress, 'cool');
  const bigSwing = maxT - minT >= 9;
  if (bigSwing && minT <= 17) pushUnique(advice.dress, 'layer');
  if (wind >= 29 && advice.dress.indexOf('waterproof') === -1) pushUnique(advice.dress, 'windy');
  if (advice.dress.length === 0) pushUnique(advice.dress, 'comfortable');

  // -- Plan your day --
  if (snowNow || snowDay) {
    pushUnique(advice.plan, 'snow');
  } else if (precipToday || pop >= 60) {
    pushUnique(advice.plan, 'indoor');
  } else if (codeDay <= 1 && codeNow <= 1) {
    pushUnique(advice.plan, 'sunny');
  } else if (codeDay === 2 || codeDay === 3 || codeNow === 2 || codeNow === 3) {
    pushUnique(advice.plan, 'cloudy');
  }
  if (maxT >= 31) pushUnique(advice.plan, 'hot');
  if (advice.plan.length === 0 && !fog) pushUnique(advice.plan, 'comfortable');

  // -- Pack list (only what is actually needed) --
  const uvRelevant = !precipToday && !fog;
  const heavyDayFlag = heavyNow || heavyDay;
  if ((pop >= 55 || rainNow || rainDay) && !heavyDayFlag) pushUnique(advice.gear, 'umbrella');
  if (heavyDayFlag) pushUnique(advice.gear, 'raincoat');
  if (snowNow || snowDay || maxT <= 8) pushUnique(advice.gear, 'warm');
  if (uvRelevant && uv >= 5) pushUnique(advice.gear, 'sunscreen');
  if (uvRelevant && uv >= 7) pushUnique(advice.gear, 'sunglasses');
  if (uvRelevant && uv >= 9) pushUnique(advice.gear, 'hat');
  if (maxT >= 30 || curT >= 30) pushUnique(advice.gear, 'water');

  return advice;
}

type Kind = 'clear' | 'partly' | 'cloud' | 'fog' | 'rain' | 'snow' | 'storm';

function kindFor(code: number): Kind {
  if (code <= 1) return 'clear';
  if (code === 2) return 'partly';
  if (code === 3) return 'cloud';
  if (code >= 45 && code <= 48) return 'fog';
  if (code >= 71 && code <= 77) return 'snow';
  if (code >= 85 && code <= 86) return 'snow';
  if (code >= 80 && code <= 82) return 'rain';
  if (code >= 51 && code <= 57) return 'rain';
  if (code >= 61 && code <= 67) return 'rain';
  if (code >= 95) return 'storm';
  return 'cloud';
}

function WeatherGlyph({ code }: { code: number }) {
  const kind = kindFor(code);
  const common = {
    width: '100%',
    height: '100%',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  };

  return (
    <svg {...common} role="presentation">
      {kind === 'clear' ? (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </>
      ) : kind === 'partly' ? (
        <>
          <path d="M11 4v2M4.9 5.9l1.4 1.4M18 12h2M18.1 5.9l-1.4 1.4" />
          <circle cx="11" cy="10.5" r="3.2" />
          <path d="M17.5 19.5H9a6 6 0 1 1 5.8-7.6h1.4a3.9 3.9 0 1 1 1.3 7.6Z" />
        </>
      ) : kind === 'fog' ? (
        <>
          <path d="M17.5 15.5H9a6.5 6.5 0 1 1 6.2-8.4h1.3a4 4 0 1 1 1 7.9Z" />
          <path d="M6 18.5h12M8 21.5h8" />
        </>
      ) : kind === 'rain' ? (
        <>
          <path d="M17.5 13H9a6.5 6.5 0 1 1 6.2-8.4h1.3a4 4 0 1 1 1 7.4Z" />
          <path d="M8.5 16.5 7 20M13 16.5l-1.5 3.5M17 16.5 15.5 20" />
        </>
      ) : kind === 'snow' ? (
        <>
          <path d="M17.5 13H9a6.5 6.5 0 1 1 6.2-8.4h1.3a4 4 0 1 1 1 7.4Z" />
          <path d="M8 17h.01M12 16.5h.01M16 17h.01" />
        </>
      ) : kind === 'storm' ? (
        <>
          <path d="M17.5 12.5H9a6.5 6.5 0 1 1 6.2-8.4h1.3a4 4 0 1 1 1 7.4Z" />
          <path d="m13 14-3 5h4l-2.5 4 4.5-7h-4" />
        </>
      ) : (
        <path d="M17.5 16.5H9a6.5 6.5 0 1 1 6.2-8.4h1.3a4 4 0 1 1 1 7.4Z" />
      )}
    </svg>
  );
}

async function fetchForecast(): Promise<ForecastPayload | null> {
  const url =
    'https://api.open-meteo.com/v1/forecast' +
    `?latitude=${LATITUDE}&longitude=${LONGITUDE}` +
    '&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,uv_index' +
    '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max,wind_speed_10m_max' +
    '&timezone=Europe%2FParis&forecast_days=7&wind_speed_unit=kmh';

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { accept: 'application/json' },
      next: { revalidate: 900 },
    });
    if (!res.ok) return null;
    return (await res.json()) as ForecastPayload;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export default async function WeatherSection({ locale }: { locale: string }) {
  const messages = (await getMessages()) as { weather?: WeatherTexts };
  const wx = messages.weather;
  if (!wx) return null;

  const forecast = await fetchForecast();
  const daily = forecast?.daily;
  const current = forecast?.current;
  if (!daily || !daily.time?.length || !current) {
    return null;
  }

  const localeTag = locale === 'zh' ? 'zh-CN' : locale === 'fr' ? 'fr-FR' : 'en-GB';
  const dayFmt = new Intl.DateTimeFormat(localeTag, {
    timeZone: 'Europe/Paris',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
  const timeFmt = new Intl.DateTimeFormat(localeTag, {
    timeZone: 'Europe/Paris',
    hour: '2-digit',
    minute: '2-digit',
  });

  const labelOf = (code: number) => wx.codes[String(code)] ?? wx.codes['0'] ?? '';
  const formatDay = (value: string) => dayFmt.format(new Date(`${value}T12:00:00Z`));
  const updatedAt = current.time ? timeFmt.format(new Date(`${current.time}Z`)) : '';

  const today = daily.time[0];
  const isToday = (date: string) => date === today;
  const currentCode = current.weather_code ?? 0;
  const codeDay = daily.weather_code[0] ?? currentCode;
  const minT = daily.temperature_2m_min[0] ?? current.temperature_2m ?? 0;
  const maxT = daily.temperature_2m_max[0] ?? current.temperature_2m ?? 0;
  const windNow = current.wind_speed_10m ?? 0;
  const windMax = daily.wind_speed_10m_max?.[0] ?? windNow;
  const uvMax = daily.uv_index_max?.[0] ?? 0;
  const pop = daily.precipitation_probability_max[0] ?? 0;

  // -- Smart visitor advice (only relevant items are rendered) --
  const sug = wx.suggest;
  let advice: Advice = { dress: [], plan: [], gear: [], risk: [] };
  if (sug) {
    advice = buildAdvice({
      curT: current.temperature_2m ?? 0,
      minT,
      maxT,
      codeNow: currentCode,
      codeDay,
      pop,
      windNow,
      windMax,
      uv: uvMax,
    });
  }
  const dressTexts = advice.dress.map((id) => sug?.dress[id]).filter(Boolean);
  const planTexts = advice.plan.map((id) => sug?.plan[id]).filter(Boolean);
  const gearItems = advice.gear.map((id) => sug?.items[id]).filter(Boolean);
  const riskTexts = advice.risk.map((id) => sug?.risks[id]).filter(Boolean);

  return (
    <section id="weather" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="mx-auto max-w-5xl">
        <h2
          className="font-display text-3xl font-semibold sm:text-4xl"
          style={{ color: 'var(--text-primary)' }}
        >
          {wx.title}
        </h2>
        {wx.subtitle ? (
          <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
            {wx.subtitle}
          </p>
        ) : null}
        {updatedAt ? (
          <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
            {wx.updated} {updatedAt}
          </p>
        ) : null}

        <div className="mt-6 mb-6 grid gap-5 rounded-2xl border p-5 sm:grid-cols-[auto_1fr] sm:p-6" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0" style={{ color: 'var(--accent)', width: '3.5rem', height: '3.5rem' }}>
              <WeatherGlyph code={currentCode} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                {wx.current}
              </p>
              <p className="font-display text-5xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {Math.round(current.temperature_2m ?? 0)}°
              </p>
              <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                {labelOf(currentCode)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-xl p-3" style={{ background: 'var(--bg-tertiary)' }}>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{wx.todayHigh}</p>
              <p className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                {Math.round(maxT)}°
              </p>
            </div>
            <div className="rounded-xl p-3" style={{ background: 'var(--bg-tertiary)' }}>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{wx.todayLow}</p>
              <p className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                {Math.round(minT)}°
              </p>
            </div>
            <div className="rounded-xl p-3" style={{ background: 'var(--bg-tertiary)' }}>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{wx.precip}</p>
              <p className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                {pop != null ? `${Math.round(pop)}%` : '—'}
              </p>
            </div>
            <div className="rounded-xl p-3" style={{ background: 'var(--bg-tertiary)' }}>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{wx.feelsLike}</p>
              <p className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                {Math.round(current.apparent_temperature ?? current.temperature_2m ?? 0)}°
              </p>
            </div>
            <div className="rounded-xl p-3" style={{ background: 'var(--bg-tertiary)' }}>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{wx.humidity}</p>
              <p className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                {current.relative_humidity_2m != null ? `${current.relative_humidity_2m}%` : '—'}
              </p>
            </div>
            <div className="rounded-xl p-3" style={{ background: 'var(--bg-tertiary)' }}>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{wx.wind}</p>
              <p className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                {Math.round(windNow)} km/h
              </p>
            </div>
          </div>
        </div>

        {sug && (
          <div className="mb-6 space-y-4">
            {riskTexts.length > 0 ? (
              <div
                className="rounded-xl p-4 sm:p-5"
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderLeft: '4px solid #dc2626',
                }}
              >
                <p
                  className="font-display mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wide"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: '#dc2626' }} />
                  {sug.riskLabel}
                </p>
                <ul className="space-y-1.5">
                  {riskTexts.map((text, i) => (
                    <li key={i} className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="grid gap-4 md:grid-cols-3">
              {dressTexts.length > 0 ? (
                <div className="rounded-xl p-4" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                  <p className="font-display mb-2 flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: 'var(--accent)' }} />
                    {sug.dressLabel}
                  </p>
                  <ul className="space-y-1.5">
                    {dressTexts.map((text, i) => (
                      <li key={i} className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {planTexts.length > 0 ? (
                <div className="rounded-xl p-4" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                  <p className="font-display mb-2 flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: 'var(--accent)' }} />
                    {sug.planLabel}
                  </p>
                  <ul className="space-y-1.5">
                    {planTexts.map((text, i) => (
                      <li key={i} className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {gearItems.length > 0 ? (
                <div className="rounded-xl p-4" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                  <p className="font-display mb-2 flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: 'var(--accent)' }} />
                    {sug.gearLabel}
                  </p>
                  <ul className="space-y-1.5">
                    {gearItems.map((text, i) => (
                      <li key={i} className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-7">
          {daily.time.map((date, index) => {
            const code = daily.weather_code[index];
            const isCurrent = isToday(date);
            const dayMax = daily.temperature_2m_max[index];
            const dayMin = daily.temperature_2m_min[index];
            const dayPop = daily.precipitation_probability_max[index];
            return (
              <div
                key={date}
                className={`rounded-xl border p-3 text-center ${isCurrent ? 'sm:-translate-y-1' : ''}`}
                style={{
                  background: 'var(--card-bg)',
                  borderColor: isCurrent ? 'var(--accent)' : 'var(--border-color)',
                  boxShadow: isCurrent ? 'var(--card-shadow)' : undefined,
                }}
              >
                <p className="text-xs font-semibold" style={{ color: isCurrent ? 'var(--accent)' : 'var(--text-muted)' }}>
                  {formatDay(date)}
                </p>
                <div className="mx-auto my-2 h-7 w-7" style={{ color: 'var(--accent)' }}>
                  <WeatherGlyph code={code} />
                </div>
                <p className="truncate text-[11px]" title={labelOf(code)} style={{ color: 'var(--text-secondary)' }}>
                  {labelOf(code)}
                </p>
                <p className="mt-1 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {Math.round(dayMin ?? 0)}° / {Math.round(dayMax ?? 0)}°
                </p>
                {dayPop != null ? (
                  <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                    {wx.precip} {dayPop}%
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>

        {wx.disclaimer ? (
          <p className="mt-5 text-xs" style={{ color: 'var(--text-muted)' }}>
            {wx.disclaimer}
          </p>
        ) : null}
      </div>
    </section>
  );
}
