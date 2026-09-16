import type { Metadata } from 'next';
import { Manrope, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const sansFont = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const monoFont = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

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
    <html lang="ru" className={`${sansFont.variable} ${monoFont.variable}`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0a0c10" />
      </head>
      <body className="antialiased bg-[#0a0c10] text-[#e2e8f0] min-h-screen flex flex-col font-sans selection:bg-[#ff5500] selection:text-white">
        {children}
      </body>
    </html>
  );
}
