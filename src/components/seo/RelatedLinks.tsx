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
    <section className="my-16 max-w-5xl mx-auto w-full border-t border-[#212734] pt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Related Tools */}
        {tools.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[#ff5500] font-mono text-sm">◈</span>
              <h3 className="font-extrabold text-sm sm:text-base text-white uppercase font-sans tracking-tight">
                {locale === 'ru' ? 'Рекомендуемые инструменты' : 'Related Tools'}
              </h3>
            </div>

            <div className="grid gap-2.5">
              {tools.map((tool) => (
                <Link
                  key={tool.slug[locale]}
                  href={`/${locale}/${tool.slug[locale]}`}
                  className="p-3.5 rounded-xl border border-[#212734] bg-[#11141c] hover:border-[#ff5500] transition-all flex items-center justify-between group shadow-sm"
                >
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-200 group-hover:text-[#ff5500] font-sans">
                      {tool.title[locale]}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 font-mono">
                      {tool.subtitle[locale]}
                    </p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#ff5500] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Docs */}
        {docs.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[#ff5500] font-mono text-sm">◈</span>
              <h3 className="font-extrabold text-sm sm:text-base text-white uppercase font-sans tracking-tight">
                {locale === 'ru' ? 'Связанные руководства' : 'Related Manuals'}
              </h3>
            </div>

            <div className="grid gap-2.5">
              {docs.map((doc) => (
                <Link
                  key={doc.slug}
                  href={`/${locale}/docs/${doc.slug}`}
                  className="p-3.5 rounded-xl border border-[#212734] bg-[#11141c] hover:border-[#ff5500] transition-all flex items-center justify-between group shadow-sm"
                >
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#ff5500]">
                      {doc.category[locale]} • {doc.readTime}
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-200 group-hover:text-[#ff5500] line-clamp-1 mt-0.5 font-sans">
                      {doc.title[locale]}
                    </h4>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#ff5500] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
