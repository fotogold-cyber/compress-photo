import React from 'react';
import Link from 'next/link';
import { Aperture, ShieldCheck, Zap, Cpu } from 'lucide-react';
import { translations, Locale } from '@/lib/i18n/translations';
import { TOOLS_DATA } from '@/lib/tools-data';
import { DOCS_DATA } from '@/lib/docs-data';

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const t = translations[locale];

  return (
    <footer className="mt-24 border-t border-[#1e2430] bg-[#090b0e] text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Technical spec */}
          <div className="lg:col-span-2 space-y-4">
            <Link href={`/${locale}`} className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded bg-[#141822] border border-[#262f3f] flex items-center justify-center text-[#ff5500]">
                <Aperture className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              </div>
              <span className="font-extrabold text-sm sm:text-base text-white tracking-tight uppercase">
                {locale === 'ru' ? 'СжатьФото.онлайн' : 'CompressPhoto.online'}
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed font-sans">
              {t.footer.privacyNote}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2 text-[10px] font-mono text-slate-400">
              <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/60">
                <ShieldCheck className="w-3 h-3" />
                ZERO_SERVER_TRANSMIT
              </span>
              <span className="inline-flex items-center gap-1 text-slate-300 bg-[#161a24] px-2 py-0.5 rounded border border-[#283142]">
                <Cpu className="w-3 h-3 text-[#ff5500]" />
                CANVAS_2D_V2
              </span>
            </div>
          </div>

          {/* Tools matrix */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-1.5">
              <span className="text-[#ff5500]">◈</span>
              <span>{t.footer.toolsHeading}</span>
            </h3>
            <ul className="space-y-2 text-xs font-mono">
              {TOOLS_DATA.map((tool) => (
                <li key={tool.slug[locale]}>
                  <Link
                    href={`/${locale}/${tool.slug[locale]}`}
                    className="hover:text-[#ff5500] text-slate-400 transition-colors block truncate"
                  >
                    {tool.title[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Docs / Knowledge base */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-1.5">
              <span className="text-[#ff5500]">◈</span>
              <span>{t.footer.docsHeading}</span>
            </h3>
            <ul className="space-y-2 text-xs font-mono">
              {DOCS_DATA.map((doc) => (
                <li key={doc.slug}>
                  <Link
                    href={`/${locale}/docs/${doc.slug}`}
                    className="hover:text-[#ff5500] text-slate-400 transition-colors line-clamp-1"
                    title={doc.title[locale]}
                  >
                    {doc.title[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#181d26] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {t.siteName}. {t.footer.copyright}
          </div>
          <div className="flex items-center gap-4">
            <Link href={`/${locale}/docs`} className="hover:text-[#ff5500] transition-colors">
              {t.nav.docs}
            </Link>
            <span>•</span>
            <Link
              href={`/${locale === 'ru' ? 'en' : 'ru'}`}
              className="hover:text-[#ff5500] transition-colors text-slate-400"
            >
              {locale === 'ru' ? 'EN_VERSION' : 'RU_VERSION'}
            </Link>
            <span>•</span>
            <span className="text-slate-600">VERCEL_EDGE_READY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
