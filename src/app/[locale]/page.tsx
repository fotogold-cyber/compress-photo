import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Aperture, ShieldCheck, Zap, Layers, FileArchive, CheckCircle2, ArrowRight, Cpu, Eye, Lock } from 'lucide-react';
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
    ? 'Сжать фото онлайн без потери качества — Клиентская фотолаборатория'
    : 'Compress Images Online Without Quality Loss - In-Browser Optics Lab';

  const description = isRu
    ? 'Локальное сжатие и конвертация фото JPEG, PNG, WebP и AVIF в браузере. Без серверов, без потери четкости, полная приватность личных файлов.'
    : 'In-browser client-side image compressor for JPEG, PNG, WebP, and AVIF. Zero server uploads, sharp detail retention, 100% private.';

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
      siteName: isRu ? 'СжатьФото' : 'CompressPhoto',
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
            q: 'Как работает клиентское сжатие в браузере?',
            a: 'Сжатие выполняется встроенным движком Canvas API и OffscreenCanvas непосредственно на процессоре и видеокарте вашего устройства. Ни один файл не отправляется на сторонние серверы, что гарантирует полную безопасность конфиденциальных документов и фотографий.',
          },
          {
            q: 'Ухудшится ли качество и четкость при сжатии?',
            a: 'Алгоритм дискретно-косинусного квантования (DCT) при качестве 75–85% отбрасывает лишь неразличимые для человеческого глаза высокочастотные цветовые шумы, сохраняя резкость линий и детализацию лиц.',
          },
          {
            q: 'Как гарантированно уложиться в 100 КБ для Госуслуг или визы?',
            a: 'В панели настроек включите поле «Целевой вес (КБ)» и укажите 100 или 200. Наш алгоритм бинарного поиска автоматически выполнит итеративный расчет качества и разрешения, чтобы файл соответствовал строгому лимиту.',
          },
          {
            q: 'Есть ли лимит на размер исходных файлов?',
            a: 'Ограничений нет — вы можете сжимать даже 50-мегапиксельные фотографии с зеркальных камер. Вся обработка масштабируется по ресурсам вашего компьютера.',
          },
        ]
      : [
          {
            q: 'How does in-browser client-side compression work?',
            a: 'Processing is performed directly in your local browser memory via HTML5 Canvas API and bicubic scaling algorithms. Zero bytes are uploaded to remote servers, giving you complete privacy.',
          },
          {
            q: 'Will visual quality or facial details degrade?',
            a: 'At 75–85% quality factor, redundant high-frequency chroma frequencies are stripped while preserving edge sharpness and contrast ratios perfectly.',
          },
          {
            q: 'Can I enforce a strict 100KB threshold for visas and government forms?',
            a: 'Yes. Input 100 into the Target Size (KB) limiter. The engine runs a binary-search optimization pass to guarantee the resulting payload never exceeds 100KB.',
          },
        ];

  return (
    <div className="space-y-20">
      {/* Schemas */}
      <WebAppJsonLd
        name={t.siteName}
        description={t.hero.subtitle}
        url={`https://compress-photo.online/${validLocale}`}
      />
      <FaqJsonLd items={faqItems} />

      {/* Hero Section — Precision Lab Aesthetic */}
      <section className="text-center max-w-4xl mx-auto space-y-5 pt-4 sm:pt-10">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-[#161a24] text-slate-300 border border-[#273042] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#ff5500] animate-pulse" />
          <span className="text-[#ff5500] uppercase font-bold">ZERO SERVER UPLOAD</span>
          <span className="text-slate-600">|</span>
          <span>100% PRIVATE CLIENT-SIDE ENGINE</span>
        </div>

        <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tight leading-[1.08] font-sans uppercase">
          {validLocale === 'ru' ? (
            <>
              СЖАТЬ ФОТО ОНЛАЙН <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5500] via-[#ff8800] to-[#ffaa00]">
                БЕЗ ПОТЕРИ ЧЕТКОСТИ
              </span>
            </>
          ) : (
            <>
              COMPRESS IMAGES <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5500] via-[#ff8800] to-[#ffaa00]">
                WITHOUT QUALITY LOSS
              </span>
            </>
          )}
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed font-sans">
          {validLocale === 'ru'
            ? 'Аппаратное квантование JPEG, PNG, WebP и AVIF прямо в оперативной памяти браузера. Моментальная пакетная обработка без передачи персональных данных в облако.'
            : 'Hardware-accelerated quantization for JPEG, PNG, WebP, and AVIF inside your browser memory. Instant batch processing with zero cloud data transmission.'}
        </p>
      </section>

      {/* Main Compressor Workbench */}
      <section className="max-w-4xl mx-auto">
        <PhotoCompressor locale={validLocale} />
      </section>

      {/* Specialized Tools Matrix (SEO Hub) */}
      <section className="max-w-6xl mx-auto pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-[#212734] pb-4 mb-8">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#ff5500] font-bold">
              // 01. SPECIALIZED INSTRUMENTS
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white uppercase tracking-tight font-sans mt-1">
              {validLocale === 'ru' ? 'Специализированные режимы обработки' : 'Dedicated Compression Profiles'}
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500 mt-2 sm:mt-0">
            {TOOLS_DATA.length} PROFILES LOADED
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOLS_DATA.map((tool, idx) => (
            <Link
              key={tool.slug[validLocale]}
              href={`/${validLocale}/${tool.slug[validLocale]}`}
              className="p-5 rounded-xl border border-[#212734] bg-[#11141c] hover:border-[#ff5500] hover:bg-[#151924] transition-all group flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-3">
                  <span>MOD #{String(idx + 1).padStart(2, '0')}</span>
                  <span className="text-[#ff5500] group-hover:translate-x-1 transition-transform">→</span>
                </div>
                <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-[#ff5500] transition-colors">
                  {tool.title[validLocale]}
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-2 font-sans">
                  {tool.subtitle[validLocale]}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1a202c] flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{validLocale === 'ru' ? 'ЗАПУСТИТЬ РЕЖИМ' : 'LAUNCH MODE'}</span>
                <span className="text-slate-600">CANVAS_API</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Engineering Specs / Advantages */}
      <section className="max-w-6xl mx-auto pt-6">
        <div className="border-b border-[#212734] pb-4 mb-8">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#ff5500] font-bold">
            // 02. ARCHITECTURAL SPECS
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white uppercase tracking-tight font-sans mt-1">
            {validLocale === 'ru' ? 'Преимущества локального движка' : 'Engine Architecture & Privacy'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              code: 'SPEC.01',
              title: validLocale === 'ru' ? '100% Локальная обработка' : '100% In-Memory Processing',
              desc: validLocale === 'ru'
                ? 'Биометрические фото, паспорта и визовые анкеты обрабатываются в изолированном контексте вашего браузера. Никаких утечек баз данных.'
                : 'Sensitive identity scans, passports, and visa applications never leave your browser memory sandbox. Zero cloud exposure.',
            },
            {
              code: 'SPEC.02',
              title: validLocale === 'ru' ? 'Адаптивный бинарный поиск' : 'Binary Search Rate Controller',
              desc: validLocale === 'ru'
                ? 'Для строгого соответствия требованиям Госуслуг и консульств компрессор вычисляет идеальную матрицу квантования до 100 КБ за миллисекунды.'
                : 'Calculates exact quantization matrices to guarantee images satisfy strict 100KB or 200KB visa portal caps.',
            },
            {
              code: 'SPEC.03',
              title: validLocale === 'ru' ? 'WebP & AVIF Нового поколения' : 'Next-Gen WebP & AVIF Matrix',
              desc: validLocale === 'ru'
                ? 'Сокращение веса картинок до 80% для максимальных показателей Google Core Web Vitals и мгновенного открытия интернет-магазинов.'
                : 'Up to 80% bandwidth compression to skyrocket Google Core Web Vitals and PageSpeed scores.',
            },
          ].map((spec, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-[#212734] bg-[#11141c] shadow-lg relative"
            >
              <span className="text-[11px] font-mono text-[#ff5500] font-bold block mb-2">
                {spec.code}
              </span>
              <h3 className="font-bold text-base text-white mb-2 font-sans">
                {spec.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                {spec.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Docs Showcase (Editorial Field Manuals) */}
      <section className="max-w-6xl mx-auto pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-[#212734] pb-4 mb-8">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#ff5500] font-bold">
              // 03. FIELD MANUALS & GUIDES
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white uppercase tracking-tight font-sans mt-1">
              {validLocale === 'ru' ? 'База знаний и технические статьи' : 'Technical Guides & Knowledge Base'}
            </h2>
          </div>
          <Link
            href={`/${validLocale}/docs`}
            className="text-xs font-mono text-[#ff5500] hover:text-white transition-colors flex items-center gap-1 mt-2 sm:mt-0"
          >
            <span>{validLocale === 'ru' ? 'ВСЕ СТАТЬИ' : 'ALL GUIDES'}</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOCS_DATA.slice(0, 3).map((doc) => (
            <Link
              key={doc.slug}
              href={`/${validLocale}/docs/${doc.slug}`}
              className="p-6 rounded-xl border border-[#212734] bg-[#11141c] hover:border-[#ff5500] transition-all group flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-2">
                  <span className="text-[#ff5500] uppercase font-bold">{doc.category[validLocale]}</span>
                  <span>{doc.readTime}</span>
                </div>
                <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-[#ff5500] transition-colors mb-2 line-clamp-2">
                  {doc.title[validLocale]}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed font-sans">
                  {doc.summary[validLocale]}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#1b212d] flex items-center justify-between text-[11px] font-mono text-slate-400 group-hover:text-white">
                <span>{validLocale === 'ru' ? 'ЧИТАТЬ СТАТЬЮ' : 'READ GUIDE'}</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Technical FAQ */}
      <section className="max-w-4xl mx-auto">
        <FaqAccordion
          items={faqItems}
          title={validLocale === 'ru' ? 'Часто задаваемые технические вопросы' : 'Frequently Asked Technical Questions'}
        />
      </section>
    </div>
  );
}
