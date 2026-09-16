'use client';

import React from 'react';
import { Sliders, Sparkles, Image as ImageIcon, Maximize2, ShieldAlert } from 'lucide-react';
import { CompressionSettings, OutputFormat } from '@/lib/types';
import { translations, Locale } from '@/lib/i18n/translations';

interface CompressionSettingsProps {
  locale: Locale;
  settings: CompressionSettings;
  onChange: (newSettings: CompressionSettings) => void;
}

export function CompressionSettingsPanel({ locale, settings, onChange }: CompressionSettingsProps) {
  const t = translations[locale];

  const handleQualityChange = (val: number) => {
    onChange({ ...settings, quality: val });
  };

  const handleFormatChange = (format: OutputFormat) => {
    onChange({ ...settings, format });
  };

  const handleTargetKbChange = (kb: number | undefined) => {
    onChange({ ...settings, targetMaxKb: kb });
  };

  const handleMaxWidthChange = (w: number | undefined) => {
    onChange({ ...settings, maxWidth: w });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4 mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
            <Sliders className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
            {t.controls.settingsTitle}
          </h3>
        </div>

        {/* Target KB indicator if active */}
        {settings.targetMaxKb && settings.targetMaxKb > 0 && (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 animate-pulse">
            ≤ {settings.targetMaxKb} KB
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quality Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {t.controls.quality}
            </label>
            <span className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded">
              {settings.quality}%
            </span>
          </div>

          <input
            type="range"
            min="10"
            max="100"
            step="1"
            value={settings.quality}
            onChange={(e) => handleQualityChange(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />

          <div className="flex items-center justify-between text-xs text-slate-400">
            <button
              type="button"
              onClick={() => handleQualityChange(60)}
              className="hover:text-blue-600 transition-colors"
            >
              {locale === 'ru' ? 'Макс. сжатие (60%)' : 'Max shrink (60%)'}
            </button>
            <button
              type="button"
              onClick={() => handleQualityChange(80)}
              className="font-medium text-blue-600 dark:text-blue-400"
            >
              {locale === 'ru' ? 'Оптимально (80%)' : 'Balanced (80%)'}
            </button>
            <button
              type="button"
              onClick={() => handleQualityChange(92)}
              className="hover:text-blue-600 transition-colors"
            >
              {locale === 'ru' ? 'Высокое (92%)' : 'High (92%)'}
            </button>
          </div>
        </div>

        {/* Output Format Selector */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block">
            {t.controls.format}
          </label>

          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'original' as OutputFormat, label: locale === 'ru' ? 'Исходный' : 'Original' },
              { id: 'image/webp' as OutputFormat, label: 'WebP (Ultra)' },
              { id: 'image/jpeg' as OutputFormat, label: 'JPEG / JPG' },
              { id: 'image/png' as OutputFormat, label: 'PNG' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => handleFormatChange(f.id)}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all ${
                  settings.format === f.id
                    ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-500 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-800/40'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Target KB / Strict size (e.g. 100 KB for Gosuslugi / Visa) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {t.controls.targetSize}
            </label>
            <span className="text-[11px] text-slate-400">
              {t.controls.targetSizeHint}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder={t.controls.targetSizePlaceholder}
              value={settings.targetMaxKb || ''}
              onChange={(e) => {
                const v = e.target.value ? Math.max(10, Number(e.target.value)) : undefined;
                handleTargetKbChange(v);
              }}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />
            {settings.targetMaxKb && (
              <button
                type="button"
                onClick={() => handleTargetKbChange(undefined)}
                className="text-xs text-rose-500 hover:text-rose-600 px-2 py-2"
                title={locale === 'ru' ? 'Сбросить лимит' : 'Clear limit'}
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => handleTargetKbChange(100)}
              className="text-[11px] font-medium px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 border border-blue-200/50 dark:border-blue-900/40 hover:bg-blue-100 transition-colors"
            >
              100 КБ (Госуслуги)
            </button>
            <button
              type="button"
              onClick={() => handleTargetKbChange(200)}
              className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
            >
              200 КБ (Визы)
            </button>
            <button
              type="button"
              onClick={() => handleTargetKbChange(500)}
              className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
            >
              500 КБ (Web)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
