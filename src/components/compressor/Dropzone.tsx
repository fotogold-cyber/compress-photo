'use client';

import React, { useRef, useState, useEffect } from 'react';
import { UploadCloud, Camera, Sparkles, Clipboard, Focus, Maximize } from 'lucide-react';
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
          if (file) files.push(file);
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
      e.target.value = '';
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative group cursor-pointer rounded-2xl border p-8 sm:p-14 text-center transition-all duration-300 overflow-hidden ${
        isDragOver
          ? 'border-[#ff5500] bg-[#ff5500]/5 scale-[1.01] shadow-[0_0_40px_rgba(255,85,0,0.2)]'
          : 'border-[#262c3a] bg-[#10131a]/90 hover:border-[#384257] hover:bg-[#131722] shadow-2xl'
      }`}
    >
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/avif,image/bmp,image/*"
        onChange={handleChange}
        className="hidden"
        disabled={disabled}
      />

      {/* Optical Viewfinder Corner Crop Marks */}
      <div className="pointer-events-none absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#ff5500] opacity-80 group-hover:opacity-100 transition-opacity" />
      <div className="pointer-events-none absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#ff5500] opacity-80 group-hover:opacity-100 transition-opacity" />
      <div className="pointer-events-none absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#ff5500] opacity-80 group-hover:opacity-100 transition-opacity" />
      <div className="pointer-events-none absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#ff5500] opacity-80 group-hover:opacity-100 transition-opacity" />

      {/* Center crosshair watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5 group-hover:opacity-10 transition-opacity">
        <Focus className="w-48 h-48 text-white stroke-[1]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center max-w-xl mx-auto">
        {/* Optical Sensor Icon */}
        <div
          className={`w-16 h-16 rounded-xl flex items-center justify-center mb-5 border transition-all duration-300 ${
            isDragOver
              ? 'bg-[#ff5500] border-[#ff5500] text-white scale-110 shadow-lg shadow-[#ff5500]/50'
              : 'bg-[#181d28] border-[#2c3547] text-[#ff5500] group-hover:border-[#ff5500] group-hover:scale-105 shadow-inner'
          }`}
        >
          <Camera className="w-8 h-8" />
        </div>

        {/* Viewfinder Telemetry Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500] animate-ping" />
          <span className="text-[11px] font-mono tracking-widest text-[#ff5500] uppercase font-bold">
            {isDragOver
              ? '● EXPOSURE READY // RELEASE TO PROCESS'
              : '● OPTICAL BUFFER READY // DRAG & DROP'}
          </span>
        </div>

        <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight mb-2.5 font-sans">
          {isDragOver ? t.dropzone.dropActive : t.dropzone.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-400 mb-7 leading-relaxed max-w-md font-sans">
          {t.dropzone.subtitle}
        </p>

        {/* Tactile Shutter Button */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            className="px-7 py-3.5 rounded-xl bg-[#ff5500] hover:bg-[#e04b00] active:scale-95 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#ff5500]/30 transition-all border border-[#ff7733] flex items-center gap-2"
          >
            <Camera className="w-4 h-4" />
            <span>{t.dropzone.button}</span>
          </button>
        </div>

        {/* Format indicators & Clipboard telemetry */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 text-[11px] font-mono text-slate-400">
          <span className="px-2 py-0.5 rounded bg-[#161a24] border border-[#273042] text-slate-300">
            JPG
          </span>
          <span className="px-2 py-0.5 rounded bg-[#161a24] border border-[#273042] text-slate-300">
            PNG
          </span>
          <span className="px-2 py-0.5 rounded bg-[#161a24] border border-[#273042] text-slate-300">
            WEBP
          </span>
          <span className="px-2 py-0.5 rounded bg-[#161a24] border border-[#273042] text-slate-300">
            AVIF
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1 text-slate-400 px-2 py-0.5 rounded bg-[#161a24] border border-[#273042]">
            <Clipboard className="w-3 h-3 text-[#ff5500]" />
            CTRL + V PASTE
          </span>
        </div>
      </div>
    </div>
  );
}
