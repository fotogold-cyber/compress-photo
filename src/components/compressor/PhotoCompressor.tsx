'use client';

import React, { useState, useEffect, useCallback } from 'react';
import JSZip from 'jszip';
import { Download, Trash2, ArrowDownCircle, CheckCheck, RefreshCw, Zap, Layers, Sparkles } from 'lucide-react';
import { CompressionSettings, ImageItem } from '@/lib/types';
import { compressImage, formatBytes, getOutputFilename, loadImage } from '@/lib/compressor-engine';
import { Dropzone } from './Dropzone';
import { CompressionSettingsPanel } from './CompressionSettings';
import { ImageList } from './ImageList';
import { ComparisonModal } from './ComparisonModal';
import { translations, Locale } from '@/lib/i18n/translations';

interface PhotoCompressorProps {
  locale: Locale;
  initialSettings?: Partial<CompressionSettings>;
}

export function PhotoCompressor({ locale, initialSettings }: PhotoCompressorProps) {
  const t = translations[locale];

  const [settings, setSettings] = useState<CompressionSettings>({
    format: initialSettings?.format || 'original',
    quality: initialSettings?.quality ?? 80,
    maxWidth: initialSettings?.maxWidth,
    maxHeight: initialSettings?.maxHeight,
    targetMaxKb: initialSettings?.targetMaxKb,
    stripMetadata: true,
  });

  const [images, setImages] = useState<ImageItem[]>([]);
  const [comparingItem, setComparingItem] = useState<ImageItem | null>(null);
  const [isZipping, setIsZipping] = useState(false);

  // Compress a single image item
  const processImage = useCallback(
    async (item: ImageItem, currentSettings: CompressionSettings): Promise<ImageItem> => {
      try {
        const result = await compressImage(item.file, currentSettings);
        const compressedUrl = URL.createObjectURL(result.blob);
        const savingsPercent = Math.max(
          0,
          Math.round(((item.originalSize - result.blob.size) / item.originalSize) * 100)
        );

        return {
          ...item,
          status: 'done',
          compressedBlob: result.blob,
          compressedSize: result.blob.size,
          compressedWidth: result.width,
          compressedHeight: result.height,
          compressedType: result.format,
          compressedPreviewUrl: compressedUrl,
          savingsPercent,
          errorMessage: undefined,
        };
      } catch (err: any) {
        return {
          ...item,
          status: 'error',
          errorMessage: err.message || 'Ошибка обработки',
        };
      }
    },
    []
  );

  // Handle files selection
  const handleFilesSelected = async (newFiles: File[]) => {
    const newItems: ImageItem[] = [];

    for (const file of newFiles) {
      try {
        const { width, height } = await loadImage(file);
        const previewUrl = URL.createObjectURL(file);

        newItems.push({
          id: Math.random().toString(36).substring(2, 9),
          file,
          name: file.name,
          originalSize: file.size,
          originalWidth: width,
          originalHeight: height,
          originalType: file.type || 'image/jpeg',
          originalPreviewUrl: previewUrl,
          status: 'processing',
        });
      } catch (err) {
        console.error('Error loading image metadata:', err);
      }
    }

    setImages((prev) => [...prev, ...newItems]);

    // Process new items
    for (const item of newItems) {
      const processed = await processImage(item, settings);
      setImages((prev) => prev.map((img) => (img.id === item.id ? processed : img)));
    }
  };

  // Recompress all images when settings change
  const handleSettingsChange = async (newSettings: CompressionSettings) => {
    setSettings(newSettings);

    if (images.length === 0) return;

    setImages((prev) => prev.map((img) => ({ ...img, status: 'processing' })));

    for (const item of images) {
      const processed = await processImage(item, newSettings);
      setImages((prev) => prev.map((img) => (img.id === item.id ? processed : img)));
    }
  };

  // Remove single image
  const handleRemove = (id: string) => {
    setImages((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target) {
        if (target.originalPreviewUrl) URL.revokeObjectURL(target.originalPreviewUrl);
        if (target.compressedPreviewUrl) URL.revokeObjectURL(target.compressedPreviewUrl);
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  // Clear all images
  const handleClearAll = () => {
    images.forEach((item) => {
      if (item.originalPreviewUrl) URL.revokeObjectURL(item.originalPreviewUrl);
      if (item.compressedPreviewUrl) URL.revokeObjectURL(item.compressedPreviewUrl);
    });
    setImages([]);
  };

  // Batch download ZIP
  const handleDownloadZip = async () => {
    const readyItems = images.filter((item) => item.status === 'done' && item.compressedBlob);
    if (readyItems.length === 0) return;

    setIsZipping(true);
    try {
      const zip = new JSZip();

      readyItems.forEach((item) => {
        if (item.compressedBlob) {
          const filename = getOutputFilename(item.name, item.compressedType || item.originalType);
          zip.file(filename, item.compressedBlob);
        }
      });

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `compressed-photos-${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generating zip:', err);
    } finally {
      setIsZipping(false);
    }
  };

  // Totals
  const totalOriginalBytes = images.reduce((acc, img) => acc + img.originalSize, 0);
  const totalCompressedBytes = images.reduce(
    (acc, img) => acc + (img.compressedSize || img.originalSize),
    0
  );
  const totalSavedBytes = Math.max(0, totalOriginalBytes - totalCompressedBytes);
  const overallSavingsPercent =
    totalOriginalBytes > 0 ? Math.round((totalSavedBytes / totalOriginalBytes) * 100) : 0;

  const hasItems = images.length > 0;
  const hasCompletedItems = images.some((img) => img.status === 'done' && img.compressedBlob);

  return (
    <div className="w-full space-y-7">
      {/* Dropzone */}
      <Dropzone locale={locale} onFilesSelected={handleFilesSelected} />

      {/* Settings Panel */}
      <CompressionSettingsPanel
        locale={locale}
        settings={settings}
        onChange={handleSettingsChange}
      />

      {/* Results & Telemetry Console */}
      {hasItems && (
        <div className="space-y-4">
          {/* Telemetry bar */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#11141c] border border-[#232938] flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-xs font-mono">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">
                  {t.results.originalTotal}
                </span>
                <span className="font-bold text-white text-sm">
                  {formatBytes(totalOriginalBytes, 1, locale)}
                </span>
              </div>
              <div className="hidden sm:block text-slate-400">→</div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">
                  {t.results.compressedTotal}
                </span>
                <span className="font-bold text-[#ff5500] text-sm">
                  {formatBytes(totalCompressedBytes, 1, locale)}
                </span>
              </div>
              <div className="border-l border-[#242b3b] pl-4 sm:pl-6">
                <span className="text-slate-400 block text-[10px] uppercase">
                  {t.results.totalSaved}
                </span>
                <span className="font-extrabold text-emerald-400 text-sm flex items-center gap-1">
                  {formatBytes(totalSavedBytes, 1, locale)} (-{overallSavingsPercent}%)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
              <button
                type="button"
                onClick={handleClearAll}
                className="px-3.5 py-2 text-xs font-mono text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 rounded-lg transition-all"
              >
                {t.results.clearAll}
              </button>

              <button
                type="button"
                onClick={handleDownloadZip}
                disabled={!hasCompletedItems || isZipping}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#ff5500] hover:bg-[#e04b00] disabled:bg-slate-800 disabled:text-slate-500 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#ff5500]/25 transition-all border border-[#ff7733]"
              >
                <Download className="w-4 h-4" />
                <span>{isZipping ? 'PACKING ZIP...' : t.results.downloadAllZip}</span>
              </button>
            </div>
          </div>

          {/* List of images */}
          <ImageList
            items={images}
            locale={locale}
            onRemove={handleRemove}
            onCompare={(item) => setComparingItem(item)}
          />
        </div>
      )}

      {/* Comparison Modal */}
      {comparingItem && (
        <ComparisonModal
          item={comparingItem}
          locale={locale}
          onClose={() => setComparingItem(null)}
        />
      )}
    </div>
  );
}
