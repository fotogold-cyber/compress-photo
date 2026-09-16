'use client';

import React, { useState } from 'react';
import { X, Sparkles, SlidersHorizontal } from 'lucide-react';
import { ImageItem } from '@/lib/types';
import { formatBytes } from '@/lib/compressor-engine';
import { translations, Locale } from '@/lib/i18n/translations';

interface ComparisonModalProps {
  item: ImageItem;
  locale: Locale;
  onClose: () => void;
}

export function ComparisonModal({ item, locale, onClose }: ComparisonModalProps) {
  const t = translations[locale];
  const [sliderPos, setSliderPos] = useState(50); // percentage

  if (!item.compressedPreviewUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:px-6 flex items-center justify-between border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <h3 className="text-white font-bold text-base sm:text-lg flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-400" />
              {t.comparison.title}
            </h3>
            <span className="text-xs text-slate-400 max-w-xs truncate hidden sm:inline">
              {item.name}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {item.savingsPercent !== undefined && (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-full">
                -{item.savingsPercent}% {t.results.savings}
              </span>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 px-6 py-2.5 bg-slate-950/50 border-b border-slate-800 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">{t.comparison.before}:</span>
            <span>{formatBytes(item.originalSize, 1, locale)}</span>
            <span className="text-slate-500 font-mono">({item.originalWidth}×{item.originalHeight})</span>
          </div>
          <div className="flex items-center justify-end gap-2">
            <span className="font-semibold text-blue-400">{t.comparison.after}:</span>
            <span className="text-white font-bold">{formatBytes(item.compressedSize || 0, 1, locale)}</span>
            {item.compressedWidth && (
              <span className="text-slate-500 font-mono">({item.compressedWidth}×{item.compressedHeight})</span>
            )}
          </div>
        </div>

        {/* Visual Comparison Area */}
        <div className="relative flex-1 overflow-hidden min-h-[350px] sm:min-h-[480px] select-none bg-slate-950 flex items-center justify-center p-4">
          <div className="relative max-h-full max-w-full overflow-hidden rounded-xl border border-slate-800">
            {/* Background image: Original */}
            <img
              src={item.originalPreviewUrl}
              alt="Original"
              className="max-h-[60vh] object-contain block pointer-events-none"
            />

            {/* Foreground image: Compressed clipped by slider */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <img
                src={item.compressedPreviewUrl}
                alt="Compressed"
                className="max-h-[60vh] object-contain block pointer-events-none"
              />
            </div>

            {/* Divider line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.7)] pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg font-bold text-xs">
                ⇄
              </div>
            </div>

            {/* Labels overlay */}
            <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded text-[11px] font-semibold text-white pointer-events-none">
              {t.comparison.before}
            </div>
            <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-blue-600/80 backdrop-blur-md rounded text-[11px] font-semibold text-white pointer-events-none">
              {t.comparison.after}
            </div>
          </div>
        </div>

        {/* Footer controls: slider input */}
        <div className="p-4 sm:px-6 border-t border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 w-full max-w-md flex items-center gap-3">
            <span className="text-xs text-slate-400 shrink-0">{t.comparison.before}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg cursor-pointer"
            />
            <span className="text-xs text-blue-400 shrink-0">{t.comparison.after}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <p className="text-xs text-slate-500 hidden sm:block">
              {t.comparison.hint}
            </p>
            <button
              onClick={onClose}
              className="px-5 py-2 text-sm font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all"
            >
              {t.comparison.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
