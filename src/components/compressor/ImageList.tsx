'use client';

import React from 'react';
import { Download, Trash2, SlidersHorizontal, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { ImageItem } from '@/lib/types';
import { formatBytes, getOutputFilename } from '@/lib/compressor-engine';
import { translations, Locale } from '@/lib/i18n/translations';

interface ImageListProps {
  items: ImageItem[];
  locale: Locale;
  onRemove: (id: string) => void;
  onCompare: (item: ImageItem) => void;
}

export function ImageList({ items, locale, onRemove, onCompare }: ImageListProps) {
  const t = translations[locale];

  const handleDownloadSingle = (item: ImageItem) => {
    if (!item.compressedBlob) return;
    const url = URL.createObjectURL(item.compressedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = getOutputFilename(item.name, item.compressedType || item.originalType);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (items.length === 0) return null;

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isDone = item.status === 'done';
        const isProcessing = item.status === 'processing';
        const isError = item.status === 'error';

        return (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#11141c] border border-[#212734] hover:border-[#353f54] transition-all shadow-lg group relative overflow-hidden"
          >
            {/* Subtle index mark */}
            <div className="absolute top-1 left-2 text-[9px] font-mono text-slate-400 select-none">
              REF #{String(idx + 1).padStart(2, '0')}
            </div>

            {/* Thumbnail and Title */}
            <div className="flex items-center gap-4 min-w-0 pt-3 sm:pt-0">
              <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-[#181d28] shrink-0 border border-[#2b3548] flex items-center justify-center shadow-inner">
                <img
                  src={item.compressedPreviewUrl || item.originalPreviewUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {isProcessing && (
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center">
                    <Loader2 className="w-5 h-5 text-[#ff5500] animate-spin" />
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-slate-100 truncate max-w-xs sm:max-w-md font-sans">
                  {item.name}
                </h4>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-1">
                  <span>{formatBytes(item.originalSize, 1, locale)}</span>
                  {isDone && item.compressedSize && (
                    <>
                      <span className="text-[#ff5500]">→</span>
                      <span className="font-bold text-white bg-[#171c26] border border-[#273142] px-1.5 py-0.5 rounded">
                        {formatBytes(item.compressedSize, 1, locale)}
                      </span>
                      {item.compressedWidth && (
                        <span className="text-[10px] text-slate-400">
                          [{item.compressedWidth}×{item.compressedHeight}]
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Telemetry Badge and Actions */}
            <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1c2230]">
              {isDone && item.savingsPercent !== undefined && (
                <span
                  className={`text-xs font-mono font-bold px-2.5 py-1 rounded border ${
                    item.savingsPercent > 0
                      ? 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60'
                      : 'text-slate-400 bg-slate-900 border-slate-800'
                  }`}
                >
                  {item.savingsPercent > 0 ? `-${item.savingsPercent}%` : '0%'}
                </span>
              )}

              {isProcessing && (
                <span className="text-xs font-mono text-[#ff5500] flex items-center gap-1.5 animate-pulse">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ENCODING...
                </span>
              )}

              {isError && (
                <span className="text-xs font-mono text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  FAIL
                </span>
              )}

              {/* Compare Button */}
              {isDone && item.compressedPreviewUrl && (
                <button
                  type="button"
                  onClick={() => onCompare(item)}
                  className="p-2 text-slate-300 hover:text-white rounded-lg bg-[#181d28] hover:bg-[#202736] border border-[#2b3548] transition-all"
                  title={t.results.beforeAfter}
                >
                  <SlidersHorizontal className="w-4 h-4 text-[#ff5500]" />
                </button>
              )}

              {/* Download Single */}
              {isDone && item.compressedBlob && (
                <button
                  type="button"
                  onClick={() => handleDownloadSingle(item)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ff5500] hover:bg-[#e04b00] active:scale-95 text-white text-xs font-mono font-bold uppercase tracking-wider shadow-sm transition-all border border-[#ff7733]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.results.download}</span>
                </button>
              )}

              {/* Remove */}
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-950/30 transition-colors"
                title="Удалить"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
