export type SupportedFormat = 'image/jpeg' | 'image/png' | 'image/webp' | 'image/avif';

export type OutputFormat = 'original' | 'image/jpeg' | 'image/png' | 'image/webp' | 'image/avif';

export interface CompressionSettings {
  format: OutputFormat;
  quality: number; // 1 - 100
  maxWidth?: number;
  maxHeight?: number;
  targetMaxKb?: number; // Target size limit in KB (e.g. 100KB for government/visa forms)
  stripMetadata: boolean;
}

export interface ImageItem {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  originalWidth: number;
  originalHeight: number;
  originalType: string;
  originalPreviewUrl: string;
  
  // Compression state
  status: 'pending' | 'processing' | 'done' | 'error';
  compressedBlob?: Blob;
  compressedSize?: number;
  compressedWidth?: number;
  compressedHeight?: number;
  compressedType?: string;
  compressedPreviewUrl?: string;
  savingsPercent?: number;
  errorMessage?: string;
}

export interface ToolLandingData {
  slug: {
    ru: string;
    en: string;
  };
  title: {
    ru: string;
    en: string;
  };
  metaTitle: {
    ru: string;
    en: string;
  };
  metaDescription: {
    ru: string;
    en: string;
  };
  h1: {
    ru: string;
    en: string;
  };
  subtitle: {
    ru: string;
    en: string;
  };
  defaultSettings: CompressionSettings;
  features: {
    ru: { title: string; desc: string }[];
    en: { title: string; desc: string }[];
  };
  howToSteps: {
    ru: { step: string; text: string }[];
    en: { step: string; text: string }[];
  };
  faq: {
    ru: { q: string; a: string }[];
    en: { q: string; a: string }[];
  };
  relatedTools: string[]; // slugs
  relatedDocSlugs: string[];
}

export interface DocArticle {
  slug: string;
  category: {
    ru: string;
    en: string;
  };
  title: {
    ru: string;
    en: string;
  };
  metaTitle: {
    ru: string;
    en: string;
  };
  metaDescription: {
    ru: string;
    en: string;
  };
  readTime: string;
  datePublished: string;
  dateModified: string;
  summary: {
    ru: string;
    en: string;
  };
  content: {
    ru: string; // Markdown / HTML rich content
    en: string;
  };
  faq: {
    ru: { q: string; a: string }[];
    en: { q: string; a: string }[];
  };
  relatedToolSlugs: string[];
  relatedDocSlugs: string[];
}
