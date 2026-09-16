'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ImageIcon, Globe, ChevronDown, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';
import { translations, Locale } from '@/lib/i18n/translations';
import { TOOLS_DATA } from '@/lib/tools-data';

interface HeaderProps {
  locale: Locale;
}

export function Header({ locale }: HeaderProps) {
  const t = translations[locale];
  const pathname = usePathname();
  const [toolsOpen, setToolsOpen] = useState(false);

  // Switch locale path
  const targetLocale = locale === 'ru' ? 'en' : 'ru';
  let switchUrl = `/${targetLocale}`;
  if (pathname.includes('/docs')) {
    switchUrl = `/${targetLocale}/docs`;
  }

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
              {t.siteName}
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                PRO
              </span>
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
              {t.siteTagline}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {/* Tools Dropdown */}
          <div className="relative" onMouseLeave={() => setToolsOpen(false)}>
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              onMouseEnter={() => setToolsOpen(true)}
              className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <span>{t.nav.tools}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${toolsOpen ? 'rotate-180' : ''}`} />
            </button>

            {toolsOpen && (
              <div className="absolute top-full left-0 w-80 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl shadow-slate-900/10 grid gap-1 animate-in fade-in slide-in-from-top-2 duration-150">
                {TOOLS_DATA.map((tool) => (
                  <Link
                    key={tool.slug[locale]}
                    href={`/${locale}/${tool.slug[locale]}`}
                    onClick={() => setToolsOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {tool.title[locale]}
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-1">
                        {tool.subtitle[locale]}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Docs link */}
          <Link
            href={`/${locale}/docs`}
            className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <BookOpen className="w-4 h-4 text-slate-500" />
            <span>{t.nav.docs}</span>
          </Link>

          {/* Quick link: 100KB */}
          <Link
            href={`/${locale}/${locale === 'ru' ? 'szhat-foto-do-100-kb' : 'compress-image-to-100kb'}`}
            className="px-3.5 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-all"
          >
            {locale === 'ru' ? 'Сжать до 100 КБ' : 'To 100KB'}
          </Link>
        </nav>

        {/* Right side: Privacy Badge + Language switcher */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-1 rounded-full font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Client-Side</span>
          </div>

          <Link
            href={switchUrl}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-500 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-all shadow-sm"
            title={locale === 'ru' ? 'Switch to English' : 'Переключить на русский'}
          >
            <Globe className="w-4 h-4 text-slate-400" />
            <span className="uppercase text-xs tracking-wider">{locale === 'ru' ? 'EN' : 'RU'}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
