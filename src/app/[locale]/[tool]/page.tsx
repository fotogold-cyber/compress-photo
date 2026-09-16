import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Sparkles, CheckCircle2, HelpCircle, ListOrdered, ShieldCheck, Camera } from 'lucide-react';
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
      <section className="text-center max-w-4xl mx-auto space-y-4 pt-2 sm:pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#161a24] text-[#ff5500] border border-[#283142] shadow-sm">
          <span>●</span>
          <span>CALIBRATED WORKFLOW // {tool.defaultSettings.format.replace('image/', '').toUpperCase()}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.12] font-sans uppercase">
          {tool.h1[validLocale]}
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed font-sans">
          {tool.subtitle[validLocale]}
        </p>
      </section>

      {/* Interactive Compressor */}
      <section className="max-w-4xl mx-auto">
        <PhotoCompressor
          locale={validLocale}
          initialSettings={tool.defaultSettings}
        />
      </section>

      {/* How To Steps */}
      <section className="max-w-4xl mx-auto pt-8 border-t border-[#212734]">
        <div className="flex items-center gap-2 mb-6 justify-center">
          <ListOrdered className="w-5 h-5 text-[#ff5500]" />
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight uppercase font-sans">
            {validLocale === 'ru' ? 'Как это работает (3 простых шага)' : 'How It Works (3 Easy Steps)'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tool.howToSteps[validLocale].map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-[#212734] bg-[#11141c] shadow-lg relative"
            >
              <div className="w-7 h-7 rounded bg-[#ff5500] text-white font-mono font-bold text-xs flex items-center justify-center mb-3">
                0{idx + 1}
              </div>
              <h3 className="font-bold text-sm text-white mb-1.5 font-sans">
                {step.step}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tool Features */}
      <section className="max-w-4xl mx-auto pt-6">
        <h2 className="text-xl sm:text-2xl font-extrabold text-white text-center mb-6 uppercase font-sans">
          {validLocale === 'ru' ? 'Преимущества обработки' : 'Key Advantages'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tool.features[validLocale].map((f, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-[#212734] bg-[#11141c]"
            >
              <div className="w-7 h-7 rounded bg-[#181d28] text-emerald-400 flex items-center justify-center mb-3 font-mono text-xs border border-[#283244]">
                ✓
              </div>
              <h3 className="font-bold text-sm text-white mb-1.5 font-sans">
                {f.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
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
