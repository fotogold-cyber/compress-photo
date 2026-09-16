import React from 'react';
import Link from 'next/link';
import { Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import { Locale } from '@/lib/i18n/translations';
import { TOOLS_DATA } from '@/lib/tools-data';
import { DOCS_DATA } from '@/lib/docs-data';

interface RelatedLinksProps {
  locale: Locale;
  relatedToolSlugs?: string[];
  relatedDocSlugs?: string[];
}

export function RelatedLinks({ locale, relatedToolSlugs = [], relatedDocSlugs = [] }: RelatedLinksProps) {
  const tools = TOOLS_DATA.filter((t) =>
    relatedToolSlugs.some((s) => t.slug.ru === s || t.slug.en === s)
  );

  const docs = DOCS_DATA.filter((d) => relatedDocSlugs.includes(d.slug));

  if (tools.length === 0 && docs.length === 0) return null;

  return (
    <section className="my-16 max-w-5xl mx-auto w-full border-t border-slate-200 dark:border-slate-800 pt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Related Tools */}
        {tools.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                {locale === 'ru' ? 'Рекомендуемые инструменты' : 'Related Tools'}
              </h3>
            </div>

            <div className="grid gap-2.5">
              {tools.map((tool) => (
                <Link
                  key={tool.slug[locale]}
                  href={`/${locale}/${tool.slug[locale]}`}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/50 hover:border-blue-500 hover:shadow-sm transition-all flex items-center justify-between group"
                >
                  <div>
                    <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600">
                      {tool.title[locale]}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {tool.subtitle[locale]}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Docs */}
        {docs.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                {locale === 'ru' ? 'Полезные руководства' : 'Helpful Guides'}
              </h3>
            </div>

            <div className="grid gap-2.5">
              {docs.map((doc) => (
                <Link
                  key={doc.slug}
                  href={`/${locale}/docs/${doc.slug}`}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/50 hover:border-indigo-500 hover:shadow-sm transition-all flex items-center justify-between group"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {doc.category[locale]} • {doc.readTime}
                    </span>
                    <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 line-clamp-1 mt-0.5">
                      {doc.title[locale]}
                    </h4>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
