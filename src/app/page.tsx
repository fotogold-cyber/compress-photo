import React from 'react';
import type { Metadata } from 'next';
import HomePage, { generateMetadata as getMeta } from './[locale]/page';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export function generateMetadata(): Metadata {
  return getMeta({ params: { locale: 'ru' } });
}

export default function RootPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header locale="ru" />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <HomePage params={{ locale: 'ru' }} />
      </main>
      <Footer locale="ru" />
    </div>
  );
}
