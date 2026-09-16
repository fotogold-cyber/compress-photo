'use client';

import React from 'react';
import { Download, Trash2, SlidersHorizontal, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
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
      {items.map((item) => {
        const isDone = item.status === 'done';
        const isProcessing = item.status === 'processing';
        const isError = item.status === 'error';

        return (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all"
          >
            {/* Thumbnail and Title */}
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center">
                <img
                  src={item.compressedPreviewUrl || item.originalPreviewUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {isProcessing && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md">
                  {item.name}
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <span>{formatBytes(item.originalSize, 1, locale)}</span>
                  {isDone && item.compressedSize && (
                    <>
                      <span>→</span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {formatBytes(item.compressedSize, 1, locale)}
                      </span>
                      {item.compressedWidth && (
                        <span className="text-[11px] text-slate-400 font-mono">
                          ({item.compressedWidth}x{item.compressedHeight})
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Savings Badge and Actions */}
            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800/80">
              {isDone && item.savingsPercent !== undefined && (
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      item.savingsPercent > 0
                        ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-900/50'
                        : 'text-slate-600 bg-slate-100 dark:bg-slate-800'
                    }`}
                  >
                    {item.savingsPercent > 0 ? `-${item.savingsPercent}%` : '0%'}
                  </span>
                </div>
              )}

              {isProcessing && (
                <span className="text-xs text-blue-600 flex items-center gap-1">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  {t.results.processing}
                </span>
              )}

              {isError && (
                <span className="text-xs text-rose-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {item.errorMessage || t.results.error}
                </span>
              )}

              {/* Compare Button */}
              {isDone && item.compressedPreviewUrl && (
                <button
                  type="button"
                  onClick={() => onCompare(item)}
                  className="p-2 text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title={t.results.beforeAfter}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
              )}

              {/* Download Single */}
              {isDone && item.compressedBlob && (
                <button
                  type="button"
                  onClick={() => handleDownloadSingle(item)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.results.download}</span>
                </button>
              )}

              {/* Remove */}
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
