'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  title?: string;
}

export function FaqAccordion({ items, title }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items || items.length === 0) return null;

  return (
    <section className="my-16 max-w-4xl mx-auto w-full">
      {title && (
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-8 h-8 rounded bg-[#181d28] border border-[#2a3447] text-[#ff5500] flex items-center justify-center">
            <HelpCircle className="w-4 h-4" />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight uppercase font-sans">
            {title}
          </h2>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="border border-[#212734] rounded-xl overflow-hidden bg-[#10131a] transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-semibold text-slate-200 hover:text-[#ff5500] transition-colors"
              >
                <span className="text-sm sm:text-base font-sans">{item.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#ff5500]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-[#181d26] font-sans">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
