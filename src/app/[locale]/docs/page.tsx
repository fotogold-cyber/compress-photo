import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BookOpen, Sparkles, ArrowRight, Clock, Calendar, Compass } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { DOCS_DATA } from '@/lib/docs-data';
import { Locale } from '@/lib/i18n/translations';

interface DocsIndexProps {
  params: {
    locale: string;
  };
}

export function generateMetadata({ params }: DocsIndexProps): Metadata {
  const locale = params.locale === 'en' ? 'en' : 'ru';
  const isRu = locale === 'ru';

  const title = isRu
    ? 'База знаний и технические руководства — СжатьФото'
    : 'Optics & Image Optimization Field Manuals | CompressPhoto';

  const description = isRu
    ? 'Подробные статьи, технические разборы подготовки фото для Госуслуг и виз, бенчмарки WebP vs PNG vs JPEG, и гайды по Google PageSpeed.'
    : 'Technical articles, visa photo guidelines, WebP vs JPEG benchmarks, and PageSpeed 100/100 optimization protocols.';

  const url = `https://compress-photo.online/${locale}/docs`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ru: 'https://compress-photo.online/ru/docs',
        en: 'https://compress-photo.online/en/docs',
        'x-default': 'https://compress-photo.online/ru/docs',
      },
    },
  };
}

export default function DocsPage({ params }: DocsIndexProps) {
  const { locale } = params;
  if (locale !== 'ru' && locale !== 'en') notFound();

  const validLocale = locale as Locale;

  const breadcrumbs = [
    { name: validLocale === 'ru' ? 'Главная' : 'Home', url: `/${validLocale}` },
    { name: validLocale === 'ru' ? 'База знаний' : 'Field Manuals', url: `/${validLocale}/docs` },
  ];

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#161a24] text-[#ff5500] border border-[#273042] shadow-sm">
          <BookOpen className="w-3.5 h-3.5" />
          <span>// KNOWLEDGE REPOSITORY & PROTOCOLS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase font-sans">
          {validLocale === 'ru'
            ? 'Руководства по оптимизации и сжатию'
            : 'Compression & Optimization Field Manuals'}
        </h1>

        <p className="text-sm sm:text-base text-slate-400 font-sans">
          {validLocale === 'ru'
            ? 'Практические протоколы, регламенты требований Госуслуг и визовых центров, сравнительные тесты алгоритмов сжатия.'
            : 'Actionable protocols, consular portal specifications, and format benchmark documentation.'}
        </p>
      </section>

      {/* Article Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
        {DOCS_DATA.map((doc, idx) => (
          <Link
            key={doc.slug}
            href={`/${validLocale}/docs/${doc.slug}`}
            className="p-6 rounded-xl border border-[#212734] bg-[#11141c] hover:border-[#ff5500] transition-all group flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-slate-500 mb-3">
                <span className="font-bold uppercase tracking-wider text-[#ff5500] bg-[#181d28] px-2 py-0.5 rounded border border-[#263143]">
                  {doc.category[validLocale]}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {doc.readTime}
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-[#ff5500] transition-colors mb-2.5 leading-snug font-sans">
                {doc.title[validLocale]}
              </h2>

              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 font-sans">
                {doc.summary[validLocale]}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1a202c] flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-white">
              <span>{validLocale === 'ru' ? 'ОТКРЫТЬ ПРОТОКОЛ' : 'READ MANUAL'}</span>
              <span className="text-[#ff5500] group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
