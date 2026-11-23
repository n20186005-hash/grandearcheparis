'use client';

import labels from '@/lib/nearby-labels';
import type { Locale } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import { useState, useEffect } from 'react';

export default function Header({ interior = false, linkHomeSections = false, languagePaths }: {
  interior?: boolean;
  linkHomeSections?: boolean;
  languagePaths?: Record<Locale, string>;
}) {
  const t = useTranslations('header');
  const locale = useLocale() as Locale;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const solid = scrolled || interior;
  const nearby = labels[locale].menu;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: solid ? 'var(--bg-secondary)' : 'transparent',
        borderBottom: solid ? '1px solid var(--border-color)' : 'none',
        backdropFilter: solid ? 'blur(12px)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href={`/${locale}`} className="font-display text-lg font-semibold tracking-tight" style={{ color: solid ? 'var(--text-primary)' : '#fff' }}>
          {locale === 'zh' ? '拉德芳斯大拱门' : locale === 'es' || locale === 'fr' ? 'La Grande Arche de la Défense' : 'The Great Arch of the Defense'}
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {(['gallery', 'reviews', 'map'] as const).map((section) => (
            <a
              key={section}
              href={`${linkHomeSections ? `/${locale}` : ''}#${section}`}
              className="text-sm font-medium transition-colors"
              style={{ color: solid ? 'var(--text-secondary)' : 'rgba(255,255,255,0.85)' }}
            >
              {t(section)}
            </a>
          ))}
          <a href={`/${locale}#nearby`} className="text-sm font-medium transition-colors" style={{ color: solid ? 'var(--text-secondary)' : 'rgba(255,255,255,0.85)' }}>{nearby}</a>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageToggle paths={languagePaths} />
        </div>
      </div>
    </header>
  );
}
