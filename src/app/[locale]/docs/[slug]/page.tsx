import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Calendar, BookOpen, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { FaqAccordion } from '@/components/seo/FaqAccordion';
import { RelatedLinks } from '@/components/seo/RelatedLinks';
import { FaqJsonLd } from '@/components/seo/JsonLd';
import { DOCS_DATA, getDocArticleBySlug } from '@/lib/docs-data';
import { Locale } from '@/lib/i18n/translations';

interface DocPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export function generateStaticParams() {
  const paths: { locale: string; slug: string }[] = [];

  for (const doc of DOCS_DATA) {
    paths.push({ locale: 'ru', slug: doc.slug });
    paths.push({ locale: 'en', slug: doc.slug });
  }

  return paths;
}

export function generateMetadata({ params }: DocPageProps): Metadata {
  const locale = (params.locale === 'en' ? 'en' : 'ru') as Locale;
  const doc = getDocArticleBySlug(params.slug);

  if (!doc) {
    return { title: 'Статья' };
  }

  const otherLocale = locale === 'ru' ? 'en' : 'ru';
  const canonicalUrl = `https://compress-photo.online/${locale}/docs/${doc.slug}`;
  const alternateUrl = `https://compress-photo.online/${otherLocale}/docs/${doc.slug}`;

  return {
    title: doc.metaTitle[locale],
    description: doc.metaDescription[locale],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        [locale]: canonicalUrl,
        [otherLocale]: alternateUrl,
        'x-default': `https://compress-photo.online/ru/docs/${doc.slug}`,
      },
    },
    openGraph: {
      title: doc.metaTitle[locale],
      description: doc.metaDescription[locale],
      url: canonicalUrl,
      type: 'article',
      publishedTime: doc.datePublished,
      modifiedTime: doc.dateModified,
    },
  };
}

// Simple helper to format markdown-like text into structured paragraphs, tables, and blockquotes
function RenderMarkdownBody({ content, locale }: { content: string; locale: Locale }) {
  const paragraphs = content.trim().split('\n\n');

  return (
    <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
      {paragraphs.map((p, idx) => {
        const text = p.trim();

        // Heading 2
        if (text.startsWith('## ')) {
          return (
            <h2
              key={idx}
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white pt-6 pb-2 tracking-tight border-b border-slate-100 dark:border-slate-800"
            >
              {text.replace('## ', '')}
            </h2>
          );
        }

        // Heading 3
        if (text.startsWith('### ')) {
          return (
            <h3 key={idx} className="text-xl font-bold text-slate-900 dark:text-white pt-4">
              {text.replace('### ', '')}
            </h3>
          );
        }

        // Horizontal divider
        if (text === '---') {
          return <hr key={idx} className="border-slate-200 dark:border-slate-800 my-8" />;
        }

        // Blockquote
        if (text.startsWith('> ')) {
          return (
            <blockquote
              key={idx}
              className="border-l-4 border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 p-4 rounded-r-xl text-slate-700 dark:text-slate-300 italic text-sm sm:text-base my-4"
            >
              {text.replace('> ', '')}
            </blockquote>
          );
        }

        // Table
        if (text.includes('|') && text.includes('---')) {
          const rows = text
            .split('\n')
            .map((r) => r.trim())
            .filter(Boolean);
          const headerRow = rows[0].split('|').map((c) => c.trim()).filter(Boolean);
          const dataRows = rows.slice(2).map((r) => r.split('|').map((c) => c.trim()).filter(Boolean));

          return (
            <div key={idx} className="overflow-x-auto my-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
                    {headerRow.map((h, i) => (
                      <th key={i} className="p-3.5 font-bold text-slate-900 dark:text-white">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white/50 dark:bg-slate-900/50">
                  {dataRows.map((row, ri) => (
                    <tr key={ri} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      {row.map((cell, ci) => (
                        <td key={ci} className="p-3.5 text-slate-700 dark:text-slate-300">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        // Unordered list
        if (text.startsWith('- ') || text.startsWith('* ')) {
          const items = text.split('\n').map((line) => line.replace(/^[-*]\s+/, ''));
          return (
            <ul key={idx} className="list-disc list-inside space-y-2 pl-2">
              {items.map((item, i) => (
                <li key={i} className="text-slate-700 dark:text-slate-300">
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        // Standard paragraph (with markdown links regex replace)
        const formatted = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 font-medium underline underline-offset-2 hover:text-blue-800">$1</a>');

        return (
          <p
            key={idx}
            dangerouslySetInnerHTML={{ __html: formatted }}
          />
        );
      })}
    </div>
  );
}

export default function DocArticlePage({ params }: DocPageProps) {
  const { locale, slug } = params;
  if (locale !== 'ru' && locale !== 'en') notFound();

  const validLocale = locale as Locale;
  const doc = getDocArticleBySlug(slug);
  if (!doc) notFound();

  const breadcrumbs = [
    { name: validLocale === 'ru' ? 'Главная' : 'Home', url: `/${validLocale}` },
    { name: validLocale === 'ru' ? 'База знаний' : 'Guides', url: `/${validLocale}/docs` },
    { name: doc.title[validLocale], url: `/${validLocale}/docs/${doc.slug}` },
  ];

  return (
    <article className="max-w-4xl mx-auto space-y-12">
      {/* Schemas */}
      <FaqJsonLd items={doc.faq[validLocale]} />

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Article Header */}
      <header className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
          <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 uppercase tracking-wider">
            {doc.category[validLocale]}
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            {doc.readTime}
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            {doc.datePublished}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.2]">
          {doc.title[validLocale]}
        </h1>

        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
          {doc.summary[validLocale]}
        </p>
      </header>

      {/* Main Body */}
      <main className="prose dark:prose-invert max-w-none">
        <RenderMarkdownBody content={doc.content[validLocale]} locale={validLocale} />
      </main>

      {/* Inline Call to Action Widget */}
      <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/20 my-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-bold">
            {validLocale === 'ru' ? 'Попробуйте сжатие прямо сейчас' : 'Try client-side compression now'}
          </h3>
          <p className="text-sm text-blue-100 max-w-md">
            {validLocale === 'ru'
              ? 'Без загрузки на сервер, 100% бесплатно и без ограничений по размеру.'
              : 'Zero server uploads, completely free, and no file size limits.'}
          </p>
        </div>

        <Link
          href={`/${validLocale}`}
          className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-blue-600 font-bold text-sm shadow-md transition-all shrink-0 flex items-center gap-2"
        >
          <span>{validLocale === 'ru' ? 'Сжать фото' : 'Compress Photos'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Article FAQ */}
      <FaqAccordion
        items={doc.faq[validLocale]}
        title={validLocale === 'ru' ? 'Вопросы и ответы по теме статьи' : 'Frequently Asked Questions'}
      />

      {/* Cross-linking to related tools & other articles */}
      <RelatedLinks
        locale={validLocale}
        relatedToolSlugs={doc.relatedToolSlugs}
        relatedDocSlugs={doc.relatedDocSlugs}
      />
    </article>
  );
}
