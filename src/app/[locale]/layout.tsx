import React from 'react';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Locale } from '@/lib/i18n/translations';

export function generateStaticParams() {
  return [{ locale: 'ru' }, { locale: 'en' }];
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params;

  if (locale !== 'ru' && locale !== 'en') {
    notFound();
  }

  const validLocale = locale as Locale;

  return (
    <div className="flex flex-col min-h-screen">
      <Header locale={validLocale} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {children}
      </main>
      <Footer locale={validLocale} />
    </div>
  );
}
