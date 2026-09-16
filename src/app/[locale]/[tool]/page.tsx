import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Sparkles, CheckCircle2, HelpCircle, ListOrdered, ShieldCheck } from 'lucide-react';
import { PhotoCompressor } from '@/components/compressor/PhotoCompressor';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { FaqAccordion } from '@/components/seo/FaqAccordion';
import { RelatedLinks } from '@/components/seo/RelatedLinks';
import { WebAppJsonLd, FaqJsonLd, HowToJsonLd } from '@/components/seo/JsonLd';
import { TOOLS_DATA, getToolBySlug } from '@/lib/tools-data';
import { Locale } from '@/lib/i18n/translations';

interface ToolPageProps {
  params: {
    locale: string;
    tool: string;
  };
}

export function generateStaticParams() {
  const paths: { locale: string; tool: string }[] = [];

  for (const tool of TOOLS_DATA) {
    paths.push({ locale: 'ru', tool: tool.slug.ru });
    paths.push({ locale: 'en', tool: tool.slug.en });
  }

  return paths;
}

export function generateMetadata({ params }: ToolPageProps): Metadata {
  const locale = (params.locale === 'en' ? 'en' : 'ru') as Locale;
  const tool = getToolBySlug(params.tool, locale);

  if (!tool) {
    return {
      title: 'Инструмент сжатия фото',
    };
  }

  const otherLocale = locale === 'ru' ? 'en' : 'ru';
  const canonicalUrl = `https://compress-photo.online/${locale}/${tool.slug[locale]}`;
  const alternateUrl = `https://compress-photo.online/${otherLocale}/${tool.slug[otherLocale]}`;

  return {
    title: tool.metaTitle[locale],
    description: tool.metaDescription[locale],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        [locale]: canonicalUrl,
        [otherLocale]: alternateUrl,
        'x-default': `https://compress-photo.online/ru/${tool.slug.ru}`,
      },
    },
    openGraph: {
      title: tool.metaTitle[locale],
      description: tool.metaDescription[locale],
      url: canonicalUrl,
      type: 'website',
    },
  };
}

export default function ToolPage({ params }: ToolPageProps) {
  const { locale, tool: slug } = params;

  if (locale !== 'ru' && locale !== 'en') notFound();
  const validLocale = locale as Locale;

  const tool = getToolBySlug(slug, validLocale);
  if (!tool) notFound();

  const breadcrumbs = [
    { name: validLocale === 'ru' ? 'Главная' : 'Home', url: `/${validLocale}` },
    { name: tool.title[validLocale], url: `/${validLocale}/${tool.slug[validLocale]}` },
  ];

  return (
    <div className="space-y-12">
      {/* Schemas */}
      <WebAppJsonLd
        name={tool.title[validLocale]}
        description={tool.metaDescription[validLocale]}
        url={`https://compress-photo.online/${validLocale}/${tool.slug[validLocale]}`}
      />
      <FaqJsonLd items={tool.faq[validLocale]} />
      <HowToJsonLd
        name={tool.h1[validLocale]}
        description={tool.metaDescription[validLocale]}
        steps={tool.howToSteps[validLocale]}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Header */}
      <section className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          <span>{validLocale === 'ru' ? 'Специализированный алгоритм' : 'Specialized Engine'}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
          {tool.h1[validLocale]}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {tool.subtitle[validLocale]}
        </p>
      </section>

      {/* Interactive Compressor preconfigured for this tool */}
      <section className="max-w-4xl mx-auto">
        <PhotoCompressor
          locale={validLocale}
          initialSettings={tool.defaultSettings}
        />
      </section>

      {/* How To Steps Section (SEO Rich Snippet target) */}
      <section className="max-w-4xl mx-auto pt-8 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2.5 mb-6 justify-center">
          <ListOrdered className="w-5 h-5 text-blue-600" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            {validLocale === 'ru' ? 'Как это работает (3 простых шага)' : 'How It Works (3 Easy Steps)'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tool.howToSteps[validLocale].map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-sm relative"
            >
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center mb-3">
                {idx + 1}
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-1.5">
                {step.step}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tool Features */}
      <section className="max-w-4xl mx-auto pt-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">
          {validLocale === 'ru' ? 'Преимущества обработки' : 'Key Advantages'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tool.features[validLocale].map((f, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/50"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">
                {f.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tool Specific FAQ */}
      <FaqAccordion
        items={tool.faq[validLocale]}
        title={validLocale === 'ru' ? 'Частые вопросы об этом формате' : 'Frequently Asked Questions'}
      />

      {/* Cross-linking to related tools and articles */}
      <RelatedLinks
        locale={validLocale}
        relatedToolSlugs={tool.relatedTools}
        relatedDocSlugs={tool.relatedDocSlugs}
      />
    </div>
  );
}
