'use client';

import React from 'react';
import { Sliders, Sparkles, Image as ImageIcon, Gauge, Cpu, Check } from 'lucide-react';
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

  return (
    <div className="bg-[#10131a] border border-[#222836] rounded-2xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
      {/* Subtle top indicator strip */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff5500]/60 to-transparent" />

      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[#1c222e] pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#181d28] border border-[#2a3447] text-[#ff5500] flex items-center justify-center shadow-inner">
            <Gauge className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-sm sm:text-base tracking-tight font-sans uppercase">
              {t.controls.settingsTitle}
            </h3>
            <p className="text-[11px] font-mono text-slate-400">
              {locale === 'ru' ? 'ПАРАМЕТРЫ КВАНТОВАНИЯ И СЖАТИЯ' : 'HARDWARE ENCODING PARAMETERS'}
            </p>
          </div>
        </div>

        {/* Target limit badge */}
        {settings.targetMaxKb && settings.targetMaxKb > 0 && (
          <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-[#ff5500]/15 text-[#ff5500] border border-[#ff5500]/40 flex items-center gap-1.5 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500]" />
            LIMIT: ≤ {settings.targetMaxKb} KB
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Quality Dial */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-1.5">
              <span>{t.controls.quality}</span>
            </label>
            <div className="font-mono text-sm font-bold text-[#ff5500] bg-[#161b24] border border-[#263042] px-2.5 py-0.5 rounded shadow-inner">
              {settings.quality}%
            </div>
          </div>

          <div className="pt-2">
            <input
              type="range"
              min="10"
              max="100"
              step="1"
              value={settings.quality}
              onChange={(e) => handleQualityChange(Number(e.target.value))}
              className="w-full camera-dial"
            />
          </div>

          {/* Preset tick buttons */}
          <div className="grid grid-cols-3 gap-1.5 pt-1 text-[11px] font-mono">
            <button
              type="button"
              onClick={() => handleQualityChange(60)}
              className={`py-1 px-1.5 rounded text-center border transition-all ${
                settings.quality === 60
                  ? 'bg-[#ff5500]/20 text-[#ff5500] border-[#ff5500]/50 font-bold'
                  : 'bg-[#141822] text-slate-400 border-[#232a3a] hover:border-slate-600'
              }`}
            >
              60% MIN
            </button>
            <button
              type="button"
              onClick={() => handleQualityChange(80)}
              className={`py-1 px-1.5 rounded text-center border transition-all ${
                settings.quality === 80
                  ? 'bg-[#ff5500]/20 text-[#ff5500] border-[#ff5500]/50 font-bold'
                  : 'bg-[#141822] text-slate-400 border-[#232a3a] hover:border-slate-600'
              }`}
            >
              80% OPT
            </button>
            <button
              type="button"
              onClick={() => handleQualityChange(92)}
              className={`py-1 px-1.5 rounded text-center border transition-all ${
                settings.quality === 92
                  ? 'bg-[#ff5500]/20 text-[#ff5500] border-[#ff5500]/50 font-bold'
                  : 'bg-[#141822] text-slate-400 border-[#232a3a] hover:border-slate-600'
              }`}
            >
              92% HI
            </button>
          </div>
        </div>

        {/* Output Format Switcher */}
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold block">
            {t.controls.format}
          </label>

          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'original' as OutputFormat, label: locale === 'ru' ? 'Исходный' : 'Original', badge: 'SAME' },
              { id: 'image/webp' as OutputFormat, label: 'WebP', badge: 'NEXT-GEN' },
              { id: 'image/jpeg' as OutputFormat, label: 'JPEG', badge: 'CLASSIC' },
              { id: 'image/png' as OutputFormat, label: 'PNG', badge: 'ALPHA' },
            ].map((f) => {
              const active = settings.format === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => handleFormatChange(f.id)}
                  className={`py-2 px-3 rounded-lg border text-left flex items-center justify-between transition-all ${
                    active
                      ? 'border-[#ff5500] bg-[#ff5500]/15 text-white shadow-sm'
                      : 'border-[#222836] bg-[#141822] text-slate-400 hover:border-slate-600 hover:text-slate-200'
                  }`}
                >
                  <span className="font-mono text-xs font-bold">{f.label}</span>
                  <span className={`text-[9px] font-mono uppercase px-1 rounded ${active ? 'bg-[#ff5500] text-white' : 'text-slate-500 bg-[#1c2230]'}`}>
                    {f.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Target KB strict limiter */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
              {t.controls.targetSize}
            </label>
            <span className="text-[10px] font-mono text-slate-400">
              {locale === 'ru' ? 'БИНАРНЫЙ ПОИСК' : 'BINARY SEARCH'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="number"
                placeholder={locale === 'ru' ? 'Без лимита (напр. 100)' : 'No limit (e.g. 100)'}
                value={settings.targetMaxKb || ''}
                onChange={(e) => {
                  const v = e.target.value ? Math.max(10, Number(e.target.value)) : undefined;
                  handleTargetKbChange(v);
                }}
                className="w-full px-3.5 py-2 text-xs font-mono rounded-lg border border-[#263042] bg-[#141822] text-white placeholder-slate-600 focus:outline-none focus:border-[#ff5500] transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 pointer-events-none">
                KB
              </span>
            </div>

            {settings.targetMaxKb && (
              <button
                type="button"
                onClick={() => handleTargetKbChange(undefined)}
                className="px-2 py-2 text-xs font-mono text-rose-400 hover:text-rose-300 rounded bg-rose-950/40 border border-rose-800/60"
                title="Сбросить лимит"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick preset chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => handleTargetKbChange(100)}
              className={`text-[11px] font-mono font-bold px-2 py-1 rounded border transition-all ${
                settings.targetMaxKb === 100
                  ? 'bg-[#ff5500] text-white border-[#ff5500]'
                  : 'bg-[#151a24] text-slate-300 border-[#263042] hover:border-[#ff5500]'
              }`}
            >
              ≤ 100 KB (Госуслуги)
            </button>
            <button
              type="button"
              onClick={() => handleTargetKbChange(200)}
              className={`text-[11px] font-mono font-bold px-2 py-1 rounded border transition-all ${
                settings.targetMaxKb === 200
                  ? 'bg-[#ff5500] text-white border-[#ff5500]'
                  : 'bg-[#151a24] text-slate-300 border-[#263042] hover:border-[#ff5500]'
              }`}
            >
              ≤ 200 KB (Визы)
            </button>
            <button
              type="button"
              onClick={() => handleTargetKbChange(500)}
              className={`text-[11px] font-mono font-bold px-2 py-1 rounded border transition-all ${
                settings.targetMaxKb === 500
                  ? 'bg-[#ff5500] text-white border-[#ff5500]'
                  : 'bg-[#151a24] text-slate-300 border-[#263042] hover:border-[#ff5500]'
              }`}
            >
              ≤ 500 KB (Web)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
