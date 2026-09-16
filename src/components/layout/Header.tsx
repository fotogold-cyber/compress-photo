'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Aperture, Globe, ChevronDown, BookOpen, ShieldCheck, Compass, Sparkles } from 'lucide-react';
import { translations, Locale } from '@/lib/i18n/translations';
import { TOOLS_DATA } from '@/lib/tools-data';

interface HeaderProps {
  locale: Locale;
}

export function Header({ locale }: HeaderProps) {
  const t = translations[locale];
  const pathname = usePathname();
  const [toolsOpen, setToolsOpen] = useState(false);

  const targetLocale = locale === 'ru' ? 'en' : 'ru';
  let switchUrl = `/${targetLocale}`;
  if (pathname.includes('/docs')) {
    switchUrl = `/${targetLocale}/docs`;
  }

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#0a0c10]/90 border-b border-[#1e2430] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Aperture Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-[#141822] border border-[#283142] flex items-center justify-center text-[#ff5500] shadow-inner group-hover:border-[#ff5500] group-hover:scale-105 transition-all">
            <Aperture className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white font-sans uppercase">
                {locale === 'ru' ? 'СжатьФото' : 'CompressPhoto'}
              </span>
              <span className="text-[10px] font-mono tracking-widest px-1.5 py-0.5 rounded bg-[#1e2430] text-[#ff5500] border border-[#2e374a]">
                PRO LAB
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400 hidden sm:inline tracking-tight">
              {locale === 'ru' ? 'Клиентская фотолаборатория' : 'On-Device Optics Engine'}
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1.5">
          {/* Tools Menu */}
          <div className="relative" onMouseLeave={() => setToolsOpen(false)}>
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              onMouseEnter={() => setToolsOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-white rounded-lg hover:bg-[#141822] border border-transparent hover:border-[#283142] transition-all"
            >
              <span>{t.nav.tools}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${toolsOpen ? 'rotate-180 text-[#ff5500]' : ''}`} />
            </button>

            {toolsOpen && (
              <div className="absolute top-full left-0 w-80 p-2 bg-[#10131a] border border-[#283142] rounded-xl shadow-2xl shadow-black/80 grid gap-1 animate-in fade-in slide-in-from-top-2 duration-150">
                {TOOLS_DATA.map((tool) => (
                  <Link
                    key={tool.slug[locale]}
                    href={`/${locale}/${tool.slug[locale]}`}
                    onClick={() => setToolsOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#181d27] border border-transparent hover:border-[#2d374a] transition-all group"
                  >
                    <div className="w-7 h-7 rounded bg-[#1a1f2c] text-[#ff5500] flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs border border-[#2a3447]">
                      ◈
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-[#ff5500] transition-colors">
                        {tool.title[locale]}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 font-mono mt-0.5">
                        {tool.subtitle[locale]}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Docs / Knowledge base */}
          <Link
            href={`/${locale}/docs`}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-white rounded-lg hover:bg-[#141822] border border-transparent hover:border-[#283142] transition-all"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#ff5500]" />
            <span>{t.nav.docs}</span>
          </Link>

          {/* Preset fast button: 100KB */}
          <Link
            href={`/${locale}/${locale === 'ru' ? 'szhat-foto-do-100-kb' : 'compress-image-to-100kb'}`}
            className="px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#ff5500] bg-[#ff5500]/10 hover:bg-[#ff5500]/20 border border-[#ff5500]/40 rounded-lg transition-all"
          >
            {locale === 'ru' ? '≤ 100 КБ (Госуслуги)' : '≤ 100 KB Form'}
          </Link>
        </nav>

        {/* Right side: Hardware status LED & Language toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="tracking-tight">BROWSER MEMORY ONLY</span>
          </div>

          <Link
            href={switchUrl}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-lg border border-[#283142] bg-[#141822] hover:border-[#ff5500] text-slate-200 hover:text-[#ff5500] transition-all shadow-sm"
          >
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span className="uppercase">{locale === 'ru' ? 'EN' : 'RU'}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
