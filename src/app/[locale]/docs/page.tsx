import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BookOpen, Sparkles, ArrowRight, Clock, Calendar, CheckCircle2 } from 'lucide-react';
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
    ? 'База знаний и руководства по сжатию фото — СжатьФото'
    : 'Image Compression Knowledge Base & SEO Guides | CompressPhoto';

  const description = isRu
    ? 'Подробные статьи, инструкции по подготовке фото для Госуслуг и виз, сравнение форматов WebP, PNG, JPEG, и гайды по оптимизации PageSpeed.'
    : 'In-depth articles, portal image requirements, WebP vs JPEG vs PNG benchmarks, and PageSpeed optimization guides.';

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
    { name: validLocale === 'ru' ? 'База знаний' : 'Guides & Docs', url: `/${validLocale}/docs` },
  ];

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 shadow-sm">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{validLocale === 'ru' ? 'База знаний и инструкции' : 'Knowledge Base'}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {validLocale === 'ru'
            ? 'Руководства по оптимизации и сжатию изображений'
            : 'Image Optimization & Compression Guides'}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
          {validLocale === 'ru'
            ? 'Практические советы, технические разборы форматов и чек-листы для прохождения проверок на государственных порталах и в поисковых системах.'
            : 'Practical advice, format benchmarks, and checklists to pass official portals and Google Core Web Vitals.'}
        </p>
      </section>

      {/* Article Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {DOCS_DATA.map((doc) => (
          <Link
            key={doc.slug}
            href={`/${validLocale}/docs/${doc.slug}`}
            className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-500 hover:shadow-lg transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-3">
                <span className="font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-0.5 rounded-full border border-indigo-200/40">
                  {doc.category[validLocale]}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {doc.readTime}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-3 leading-snug">
                {doc.title[validLocale]}
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                {doc.summary[validLocale]}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
              <span>{validLocale === 'ru' ? 'Читать руководство' : 'Read guide'}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
