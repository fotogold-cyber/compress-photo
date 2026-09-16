import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Calendar, BookOpen, Sparkles, ArrowRight, ShieldCheck, Camera } from 'lucide-react';
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

function RenderMarkdownBody({ content }: { content: string }) {
  const paragraphs = content.trim().split('\n\n');

  return (
    <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base font-sans">
      {paragraphs.map((p, idx) => {
        const text = p.trim();

        // Heading 2
        if (text.startsWith('## ')) {
          return (
            <h2
              key={idx}
              className="text-xl sm:text-2xl font-black text-white pt-8 pb-2 tracking-tight uppercase border-b border-[#212734] font-sans"
            >
              {text.replace('## ', '')}
            </h2>
          );
        }

        // Heading 3
        if (text.startsWith('### ')) {
          return (
            <h3 key={idx} className="text-base sm:text-lg font-bold text-[#ff5500] pt-4 font-sans uppercase">
              {text.replace('### ', '')}
            </h3>
          );
        }

        // Horizontal divider
        if (text === '---') {
          return <hr key={idx} className="border-[#212734] my-8" />;
        }

        // Blockquote
        if (text.startsWith('> ')) {
          return (
            <blockquote
              key={idx}
              className="border-l-2 border-[#ff5500] bg-[#161a24] p-4 rounded-r-lg text-slate-300 text-xs sm:text-sm font-mono my-5"
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
            <div key={idx} className="overflow-x-auto my-6 rounded-xl border border-[#212734] shadow-xl">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="bg-[#161b24] border-b border-[#252e3e]">
                    {headerRow.map((h, i) => (
                      <th key={i} className="p-3 font-bold text-white uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1b212d] bg-[#10131a]">
                  {dataRows.map((row, ri) => (
                    <tr key={ri} className="hover:bg-[#141822]">
                      {row.map((cell, ci) => (
                        <td key={ci} className="p-3 text-slate-300">
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

        // Code block
        if (text.startsWith('```')) {
          const cleaned = text.replace(/```[a-z]*\n?/, '').replace(/```$/, '');
          return (
            <pre key={idx} className="p-4 rounded-xl bg-[#0c0e13] border border-[#212734] overflow-x-auto text-xs font-mono text-emerald-400">
              <code>{cleaned}</code>
            </pre>
          );
        }

        // Unordered list
        if (text.startsWith('- ') || text.startsWith('* ')) {
          const items = text.split('\n').map((line) => line.replace(/^[-*]\s+/, ''));
          return (
            <ul key={idx} className="space-y-2 pl-4 border-l border-[#212734]">
              {items.map((item, i) => (
                <li key={i} className="text-slate-300 flex items-start gap-2">
                  <span className="text-[#ff5500] font-mono select-none">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }

        // Standard paragraph
        const formatted = text.replace(
          /\[([^\]]+)\]\(([^)]+)\)/g,
          '<a href="$2" class="text-[#ff5500] font-medium underline underline-offset-2 hover:text-[#ff7733]">$1</a>'
        );

        return <p key={idx} dangerouslySetInnerHTML={{ __html: formatted }} />;
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
    { name: validLocale === 'ru' ? 'База знаний' : 'Manuals', url: `/${validLocale}/docs` },
    { name: doc.title[validLocale], url: `/${validLocale}/docs/${doc.slug}` },
  ];

  return (
    <article className="max-w-4xl mx-auto space-y-10">
      {/* Schemas */}
      <FaqJsonLd items={doc.faq[validLocale]} />

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Article Header */}
      <header className="space-y-4 border-b border-[#212734] pb-8 pt-2">
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono">
          <span className="px-2.5 py-0.5 rounded bg-[#161a24] text-[#ff5500] border border-[#273142] uppercase tracking-wider font-bold">
            {doc.category[validLocale]}
          </span>
          <span className="flex items-center gap-1 text-slate-500">
            <Clock className="w-3 h-3" />
            {doc.readTime}
          </span>
          <span className="flex items-center gap-1 text-slate-500">
            <Calendar className="w-3 h-3" />
            {doc.datePublished}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.18] uppercase font-sans">
          {doc.title[validLocale]}
        </h1>

        <p className="text-base text-slate-400 leading-relaxed font-sans">
          {doc.summary[validLocale]}
        </p>
      </header>

      {/* Main Body */}
      <main className="max-w-none">
        <RenderMarkdownBody content={doc.content[validLocale]} />
      </main>

      {/* Inline Call to Action Workbench Box */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#121620] border border-[#263044] text-white shadow-2xl my-12 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#ff5500]" />

        <div className="space-y-1.5 text-center sm:text-left">
          <div className="text-[10px] font-mono text-[#ff5500] uppercase font-bold tracking-widest">
            // INTERACTIVE TOOLKIT
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold uppercase font-sans">
            {validLocale === 'ru' ? 'Протестируйте локальное сжатие' : 'Test Client-Side Compression'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md font-sans">
            {validLocale === 'ru'
              ? 'Без загрузки файлов в облако. Ваши фото обрабатываются только в вашем браузере.'
              : 'Zero server uploads. Your photos are encoded strictly within browser memory.'}
          </p>
        </div>

        <Link
          href={`/${validLocale}`}
          className="px-6 py-3 rounded-xl bg-[#ff5500] hover:bg-[#e04b00] active:scale-95 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#ff5500]/30 transition-all shrink-0 flex items-center gap-2 border border-[#ff7733]"
        >
          <Camera className="w-4 h-4" />
          <span>{validLocale === 'ru' ? 'ОТКРЫТЬ КОМПРЕССОР' : 'LAUNCH COMPRESSOR'}</span>
          <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
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
