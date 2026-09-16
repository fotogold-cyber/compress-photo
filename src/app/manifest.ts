import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'СжатьФото.онлайн — Клиентская фотолаборатория',
    short_name: 'СжатьФото',
    description: 'Мгновенное сжатие и конвертация фото JPEG, PNG, WebP в браузере без потери качества.',
    start_url: '/ru',
    display: 'standalone',
    background_color: '#0a0c10',
    theme_color: '#ff5500',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
