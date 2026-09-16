'use client';

import React, { useRef, useState, useEffect } from 'react';
import { UploadCloud, Image as ImageIcon, Sparkles, Clipboard } from 'lucide-react';
import { translations, Locale } from '@/lib/i18n/translations';

interface DropzoneProps {
  locale: Locale;
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
}

export function Dropzone({ locale, onFilesSelected, disabled }: DropzoneProps) {
  const t = translations[locale];
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Clipboard paste support (Ctrl+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (disabled || !e.clipboardData) return;
      const items = Array.from(e.clipboardData.items);
      const files: File[] = [];

      for (const item of items) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            files.push(file);
          }
        }
      }

      if (files.length > 0) {
        e.preventDefault();
        onFilesSelected(files);
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [disabled, onFilesSelected]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const validFiles = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith('image/') || /\.(jpe?g|png|webp|avif|bmp|tiff?)$/i.test(file.name)
      );
      if (validFiles.length > 0) {
        onFilesSelected(validFiles);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      onFilesSelected(files);
      e.target.value = ''; // reset to allow re-uploading same file
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative group cursor-pointer rounded-2xl border-2 border-dashed p-8 sm:p-12 text-center transition-all duration-200 ${
        isDragOver
          ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/30 scale-[1.01]'
          : 'border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 hover:border-blue-400 hover:bg-slate-50/80 dark:hover:bg-slate-900/90 shadow-sm hover:shadow-md'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/avif,image/bmp,image/*"
        onChange={handleChange}
        className="hidden"
        disabled={disabled}
      />

      <div className="flex flex-col items-center justify-center max-w-xl mx-auto">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-200 ${
            isDragOver
              ? 'bg-blue-600 text-white scale-110 shadow-lg shadow-blue-500/30'
              : 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white'
          }`}
        >
          <UploadCloud className="w-8 h-8" />
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
          {isDragOver ? t.dropzone.dropActive : t.dropzone.title}
        </h3>

        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          {t.dropzone.subtitle}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-600/20 hover:shadow-lg transition-all"
          >
            {t.dropzone.button}
          </button>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono">JPG</span>
          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono">PNG</span>
          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono">WEBP</span>
          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono">AVIF</span>
          <span className="mx-1">•</span>
          <span className="flex items-center gap-1 text-slate-500">
            <Clipboard className="w-3 h-3" />
            Ctrl + V
          </span>
        </div>
      </div>
    </div>
  );
}
