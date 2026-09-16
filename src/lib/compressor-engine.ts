import { CompressionSettings } from './types';

/**
 * Format bytes to human readable string (KB, MB)
 */
export function formatBytes(bytes: number, decimals = 1, locale: 'ru' | 'en' = 'ru'): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = locale === 'ru' ? ['Б', 'КБ', 'МБ', 'ГБ'] : ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const val = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
  return `${val} ${sizes[i]}`;
}

/**
 * Read image dimensions and create Image element
 */
export function loadImage(file: File): Promise<{ img: HTMLImageElement; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve({ img, width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(new Error('Не удалось прочитать изображение'));
    };
    img.src = url;
  });
}

/**
 * Calculate scaled dimensions respecting aspect ratio
 */
export function calculateDimensions(
  origWidth: number,
  origHeight: number,
  maxWidth?: number,
  maxHeight?: number
): { width: number; height: number } {
  let width = origWidth;
  let height = origHeight;

  if (maxWidth && width > maxWidth) {
    height = Math.round((height * maxWidth) / width);
    width = maxWidth;
  }

  if (maxHeight && height > maxHeight) {
    width = Math.round((width * maxHeight) / height);
    height = maxHeight;
  }

  return { width: Math.max(1, width), height: Math.max(1, height) };
}

/**
 * Convert Canvas to Blob with specified mimeType and quality
 */
function canvasToBlob(canvas: HTMLCanvasElement, mimeType: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Ошибка экспорта Canvas в Blob'));
        }
      },
      mimeType,
      quality
    );
  });
}

/**
 * Compress an image in browser using Canvas API
 */
export async function compressImage(
  file: File,
  settings: CompressionSettings
): Promise<{
  blob: Blob;
  width: number;
  height: number;
  format: string;
}> {
  const { img, width: origWidth, height: origHeight } = await loadImage(file);

  try {
    // Determine target format
    let targetMime = file.type;
    if (settings.format !== 'original') {
      targetMime = settings.format;
    }

    // Default fallback if unsupported format
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(targetMime)) {
      targetMime = 'image/jpeg';
    }

    // Calculate initial dimensions
    let { width, height } = calculateDimensions(origWidth, origHeight, settings.maxWidth, settings.maxHeight);

    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d', { willReadFrequently: false });

    if (!ctx) {
      throw new Error('Не удалось инициализировать 2D-контекст Canvas');
    }

    // High quality scaling
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // If converting to JPEG or no transparency needed, fill background with white (prevents black background for transparent PNG)
    if (targetMime === 'image/jpeg') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
    }

    ctx.drawImage(img, 0, 0, width, height);

    // Initial quality (0.01 - 1.0)
    const normalizedQuality = Math.max(0.01, Math.min(1.0, settings.quality / 100));

    // Target KB mode (e.g. strict limit <= 100 KB or 200 KB)
    if (settings.targetMaxKb && settings.targetMaxKb > 0) {
      const maxBytes = settings.targetMaxKb * 1024;
      let lowQ = 0.05;
      let highQ = normalizedQuality;
      let bestBlob: Blob | null = null;

      // Binary search quality iterations
      for (let i = 0; i < 6; i++) {
        const midQ = (lowQ + highQ) / 2;
        const testBlob = await canvasToBlob(canvas, targetMime, midQ);

        if (testBlob.size <= maxBytes) {
          bestBlob = testBlob;
          lowQ = midQ; // Try to get better quality
        } else {
          highQ = midQ; // File too big, decrease quality
        }
      }

      // If even lowest quality is too big, progressively scale down dimensions
      if (!bestBlob || bestBlob.size > maxBytes) {
        let scale = 0.85;
        while (scale >= 0.25) {
          const scaledW = Math.max(50, Math.round(width * scale));
          const scaledH = Math.max(50, Math.round(height * scale));
          
          canvas.width = scaledW;
          canvas.height = scaledH;
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          
          if (targetMime === 'image/jpeg') {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, scaledW, scaledH);
          }
          ctx.drawImage(img, 0, 0, scaledW, scaledH);

          const scaledBlob = await canvasToBlob(canvas, targetMime, 0.65);
          if (scaledBlob.size <= maxBytes) {
            bestBlob = scaledBlob;
            width = scaledW;
            height = scaledH;
            break;
          }
          scale -= 0.15;
        }
      }

      if (bestBlob) {
        return {
          blob: bestBlob,
          width,
          height,
          format: bestBlob.type || targetMime,
        };
      }
    }

    // Standard compression
    const compressedBlob = await canvasToBlob(canvas, targetMime, normalizedQuality);

    return {
      blob: compressedBlob,
      width,
      height,
      format: compressedBlob.type || targetMime,
    };
  } finally {
    // Clean up object URL
    if (img.src.startsWith('blob:')) {
      URL.revokeObjectURL(img.src);
    }
  }
}

/**
 * Generate output filename based on new format
 */
export function getOutputFilename(originalName: string, outputMime: string): string {
  const dotIndex = originalName.lastIndexOf('.');
  const baseName = dotIndex !== -1 ? originalName.substring(0, dotIndex) : originalName;

  let ext = 'jpg';
  if (outputMime === 'image/png') ext = 'png';
  else if (outputMime === 'image/webp') ext = 'webp';
  else if (outputMime === 'image/avif') ext = 'avif';
  else if (outputMime === 'image/jpeg') ext = 'jpg';

  return `${baseName}-min.${ext}`;
}
