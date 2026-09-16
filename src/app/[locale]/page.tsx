import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Sparkles, ShieldCheck, Zap, Layers, FileArchive, CheckCircle2, ArrowRight } from 'lucide-react';
import { PhotoCompressor } from '@/components/compressor/PhotoCompressor';
import { FaqAccordion } from '@/components/seo/FaqAccordion';
import { WebAppJsonLd, FaqJsonLd } from '@/components/seo/JsonLd';
import { translations, Locale } from '@/lib/i18n/translations';
import { TOOLS_DATA } from '@/lib/tools-data';
import { DOCS_DATA } from '@/lib/docs-data';

interface PageProps {
  params: {
    locale: string;
  };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const locale = params.locale === 'en' ? 'en' : 'ru';
  const isRu = locale === 'ru';

  const title = isRu
    ? 'Сжать фото онлайн без потери качества — Бесплатный компрессор изображений'
    : 'Compress Images Online Without Quality Loss - Free Image Compressor';

  const description = isRu
    ? 'Бесплатное сжатие фото JPEG, PNG, WebP и AVIF прямо в браузере. Без потери четкости, моментально и безопасно: файлы никуда не загружаются.'
    : 'Free in-browser image compressor for JPEG, PNG, WebP, and AVIF. Maintain sharpness, instant batch processing, 100% private client-side engine.';

  const url = `https://compress-photo.online/${locale}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ru: 'https://compress-photo.online/ru',
        en: 'https://compress-photo.online/en',
        'x-default': 'https://compress-photo.online/ru',
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: isRu ? 'СжатьФото.онлайн' : 'CompressPhoto.online',
      locale: isRu ? 'ru_RU' : 'en_US',
      type: 'website',
    },
  };
}

export default function HomePage({ params }: PageProps) {
  const { locale } = params;
  if (locale !== 'ru' && locale !== 'en') notFound();

  const validLocale = locale as Locale;
  const t = translations[validLocale];

  const faqItems =
    validLocale === 'ru'
      ? [
          {
            q: 'Как работает сжатие фото в браузере?',
            a: 'Сжатие происходит с помощью HTML5 Canvas API и алгоритмов квантования непосредственно на вашем компьютере или телефоне. Ни один файл не передается по сети на сервер, что обеспечивает 100% конфиденциальность ваших данных.',
          },
          {
            q: 'Ухудшится ли четкость и детализация фотографий?',
            a: 'При рекомендованном уровне сжатия 75–85% визуальная разница для человеческого глаза неразличима. Удаляется лишь избыточная информация в незаметных цветовых диапазонах и скрытые метаданные EXIF.',
          },
          {
            q: 'Можно ли сжать фото до строгого размера, например 100 КБ для Госуслуг?',
            a: 'Да! В панели настроек активируйте поле «Целевой вес (КБ)» и задайте 100 или 200 КБ. Наш алгоритм выполнит адаптивную подгонку параметров для точного соответствия ограничениям.',
          },
          {
            q: 'Есть ли ограничения на количество файлов или размер?',
            a: 'Ограничений нет! Вы можете сжимать любое количество изображений совершенно бесплатно. Для удобства доступно пакетное скачивание всех файлов в одном ZIP-архиве.',
          },
          {
            q: 'Какие форматы изображений поддерживаются?',
            a: 'Поддерживаются все популярные форматы: JPG, JPEG, PNG, WebP, AVIF, а также скриншоты, вставленные прямо из буфера обмена (Ctrl+V).',
          },
        ]
      : [
          {
            q: 'How does client-side image compression work?',
            a: 'Compression runs entirely on your local machine via HTML5 Canvas API and bicubic sampling algorithms. Zero image bytes are transmitted over the network, ensuring complete data privacy.',
          },
          {
            q: 'Will compression degrade image sharpness?',
            a: 'At our recommended 75–85% quality sweet spot, visual differences are imperceptible to human eyes while cutting file weights by 3x–5x.',
          },
          {
            q: 'Can I target a strict file size limit like 100KB?',
            a: 'Yes! Simply type 100 or 200 into the Target Size (KB) field. The engine iteratively calibrates quality and resolution to meet portal limits.',
          },
          {
            q: 'Are there any usage caps or daily quotas?',
            a: 'None! Process as many high-res photos as needed without fees, watermarks, or account registration.',
          },
        ];

  return (
    <div className="space-y-16">
      {/* Schemas */}
      <WebAppJsonLd
        name={t.siteName}
        description={t.hero.subtitle}
        url={`https://compress-photo.online/${validLocale}`}
      />
      <FaqJsonLd items={faqItems} />

      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto space-y-4 pt-4 sm:pt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 shadow-sm animate-in fade-in duration-300">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>{t.hero.badge}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
          {t.hero.titleStart}{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            {t.hero.titleHighlight}
          </span>{' '}
          {t.hero.titleEnd}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {t.hero.subtitle}
        </p>
      </section>

      {/* Interactive Compressor */}
      <section className="max-w-4xl mx-auto">
        <PhotoCompressor locale={validLocale} />
      </section>

      {/* Quick Tools Grid (SEO Internal Linking Anchor Hub) */}
      <section className="max-w-6xl mx-auto pt-6">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            {validLocale === 'ru' ? 'Специализированные инструменты сжатия' : 'Specialized Compression Tools'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {validLocale === 'ru'
              ? 'Выберите конкретный инструмент под вашу задачу'
              : 'Targeted tools pre-calibrated for your specific workflow'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOLS_DATA.map((tool) => (
            <Link
              key={tool.slug[validLocale]}
              href={`/${validLocale}/${tool.slug[validLocale]}`}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 hover:border-blue-500 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {tool.title[validLocale]}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                  {tool.subtitle[validLocale]}
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                <span>{validLocale === 'ru' ? 'Открыть инструмент' : 'Launch tool'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto pt-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.features.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2 max-w-2xl mx-auto">
            {t.features.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: ShieldCheck, title: t.features.f1_title, desc: t.features.f1_desc },
            { icon: Zap, title: t.features.f2_title, desc: t.features.f2_desc },
            { icon: Layers, title: t.features.f3_title, desc: t.features.f3_desc },
            { icon: Sparkles, title: t.features.f4_title, desc: t.features.f4_desc },
            { icon: CheckCircle2, title: t.features.f5_title, desc: t.features.f5_desc },
            { icon: FileArchive, title: t.features.f6_title, desc: t.features.f6_desc },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Docs / Knowledge Base Showcase */}
      <section className="max-w-6xl mx-auto pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {validLocale === 'ru' ? 'Полезные статьи и инструкции' : 'Featured Guides & Instructions'}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {validLocale === 'ru'
                ? 'Подробные руководства по сжатию, форматам и ускорению сайтов'
                : 'Comprehensive articles on compression formats and Core Web Vitals'}
            </p>
          </div>
          <Link
            href={`/${validLocale}/docs`}
            className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            <span>{validLocale === 'ru' ? 'Все статьи' : 'All guides'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOCS_DATA.slice(0, 3).map((doc) => (
            <Link
              key={doc.slug}
              href={`/${validLocale}/docs/${doc.slug}`}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 hover:border-indigo-500 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {doc.category[validLocale]} • {doc.readTime}
                </span>
                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors mt-2 mb-2 line-clamp-2">
                  {doc.title[validLocale]}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {doc.summary[validLocale]}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                <span>{validLocale === 'ru' ? 'Читать статью' : 'Read guide'}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <FaqAccordion items={faqItems} title={t.faqTitle} />
    </div>
  );
}
