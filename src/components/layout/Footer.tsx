import React from 'react';
import Link from 'next/link';
import { ImageIcon, ShieldCheck, Heart, Zap, Cpu } from 'lucide-react';
import { translations, Locale } from '@/lib/i18n/translations';
import { TOOLS_DATA } from '@/lib/tools-data';
import { DOCS_DATA } from '@/lib/docs-data';

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const t = translations[locale];

  return (
    <footer className="mt-24 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/60 backdrop-blur-sm text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Mission column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href={`/${locale}`} className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
                <ImageIcon className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-slate-900 dark:text-white tracking-tight">
                {t.siteName}
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              {t.footer.privacyNote}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-900/50 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                Zero Server Uploads
              </span>
              <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded-md border border-blue-200 dark:border-blue-900/50 font-medium">
                <Cpu className="w-3.5 h-3.5" />
                Canvas API
              </span>
              <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-1 rounded-md border border-amber-200 dark:border-amber-900/50 font-medium">
                <Zap className="w-3.5 h-3.5" />
                No Limits
              </span>
            </div>
          </div>

          {/* Tools column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              {t.footer.toolsHeading}
            </h3>
            <ul className="space-y-2 text-sm">
              {TOOLS_DATA.map((tool) => (
                <li key={tool.slug[locale]}>
                  <Link
                    href={`/${locale}/${tool.slug[locale]}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {tool.title[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Docs column */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              {t.footer.docsHeading}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {DOCS_DATA.map((doc) => (
                <li key={doc.slug}>
                  <Link
                    href={`/${locale}/docs/${doc.slug}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-1"
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
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {t.siteName}. {t.footer.copyright}
          </div>
          <div className="flex items-center gap-4">
            <Link href={`/${locale}/docs`} className="hover:text-blue-600 transition-colors">
              {t.nav.docs}
            </Link>
            <span>•</span>
            <Link
              href={`/${locale === 'ru' ? 'en' : 'ru'}`}
              className="hover:text-blue-600 transition-colors font-medium"
            >
              {locale === 'ru' ? 'English version' : 'Русская версия'}
            </Link>
            <span>•</span>
            <span className="flex items-center gap-1">
              Built with Next.js & Vercel
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
