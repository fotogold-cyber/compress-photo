import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://compress-photo.online'),
  title: 'Сжать фото онлайн — Бесплатный компрессор изображений в браузере',
  description:
    'Мгновенное сжатие и конвертация фото JPEG, PNG, WebP, AVIF прямо в браузере. Без потери качества, 100% конфиденциально.',
  alternates: {
    canonical: 'https://compress-photo.online/ru',
    languages: {
      ru: 'https://compress-photo.online/ru',
      en: 'https://compress-photo.online/en',
      'x-default': 'https://compress-photo.online/ru',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'СжатьФото.онлайн',
    locale: 'ru_RU',
    url: 'https://compress-photo.online/ru',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className="antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
