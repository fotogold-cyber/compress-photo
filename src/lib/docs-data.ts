import { DocArticle } from './types';

export const DOCS_DATA: DocArticle[] = [
  {
    slug: 'kak-szhat-foto-do-100-kb',
    category: {
      ru: 'Инструкции и Госуслуги',
      en: 'Guides & Applications',
    },
    title: {
      ru: 'Как сжать фото до 100 КБ для Госуслуг, резюме и визы: пошаговое руководство',
      en: 'How to Compress an Image to Under 100KB for Passports, Visas & Job Portals',
    },
    metaTitle: {
      ru: 'Как сжать фото до 100 КБ онлайн для Госуслуг и визы — руководство',
      en: 'How to Compress Photos to Under 100KB Online - Complete Guide',
    },
    metaDescription: {
      ru: 'Пошаговая инструкция: как уменьшить размер фотографии до 100 КБ или 200 КБ без потери четкости лица для портала Госуслуги, визовых центров и резюме.',
      en: 'Step-by-step guide on how to shrink photos under 100KB or 200KB without losing facial sharpness for official portals, visa applications, and resumes.',
    },
    readTime: '4 мин',
    datePublished: '2026-01-15',
    dateModified: '2026-09-10',
    summary: {
      ru: 'Строгие лимиты на размер загружаемых файлов в 100–300 КБ — частая проблема при подаче заявлений на Госуслугах или визах. Узнайте, как быстро подогнать файл под ограничения прямо в браузере.',
      en: 'Strict upload size caps of 100KB–300KB frequently cause upload rejections on government and visa portals. Learn how to adapt your photo instantly on-device.',
    },
    content: {
      ru: `
## Почему государственные сайты требуют размер фото до 100–300 КБ?

Порталы вроде Госуслуг, визовые центры (Шенген, США, Великобритания) и системы подачи резюме ежедневно обрабатывают миллионы анкет. Чтобы серверные хранилища не переполнялись, а страницы анкет загружались даже при слабом мобильном интернете, вводятся жесткие ограничения:
- **Госуслуги (загранпаспорт, водительское удостоверение):** от 20 КБ до 300 КБ (рекомендуется до 100–200 КБ).
- **Визовые порталы и Green Card:** строго до 240 КБ, пропорции 1:1 (квадрат 600x600 px).
- **Корпоративные HR-системы (HeadHunter, SuperJob):** обычно до 1–2 МБ, но для мгновенного просмотра в резюме рекомендуется 80–150 КБ.

Если ваша камера смартфона делает снимки весом 5–15 МБ, портал выдаст ошибку: *«Файл превышает допустимый размер»*.

---

## 3 способа уменьшить размер фото до 100 КБ

### 1. Автоматический режим в онлайн-компрессоре (Рекомендуется)
Самый быстрый и безопасный путь:
1. Откройте инструмент [Сжать фото до 100 КБ](/ru/szhat-foto-do-100-kb).
2. Перетащите ваш файл в окно загрузки.
3. Система автоматически выставит целевой лимит в 100 КБ и выполнит адаптивное сжатие.
4. Проверьте результат в окне сравнения и скачайте готовое фото.

> **Важно о безопасности:** Никогда не загружайте сканы паспортов и личные фотографии на сомнительные серверы. Наш сервис обрабатывает изображения на 100% в памяти вашего браузера без отправки в интернет.

### 2. Уменьшение геометрического разрешения (Ресайз)
Если фото весит 12 МБ с разрешением 4000x3000 пикселей, простого снижения качества JPEG может быть недостаточно.
- Для анкет достаточно разрешения **1200x900 px** или **800x600 px**.
- Перейдите в [Изменить размер фото](/ru/izmenit-razmer-foto), укажите максимальную ширину 1200 px, и вес фото снизится на 70% еще до компрессии.

### 3. Удаление метаданных EXIF
Каждая фотография со смартфона хранит скрытую информацию: точные GPS-координаты места съемки, модель устройства, серийный номер и превью. Наш компрессор автоматически очищает эти метаданные, экономя до 30–70 КБ полезного объема и защищая вашу приватность.

---

## Чек-лист перед отправкой фото на Госуслуги:
- [x] Формат файла: **JPEG/JPG** (наиболее универсален).
- [x] Размер файла: **меньше 100–300 КБ**.
- [x] Разрешение: не менее 600x800 px, но не более 1920 px.
- [x] Лицо четкое, равномерное освещение, нейтральный фон.
      `,
      en: `
## Why Do Official Portals Enforce a 100KB Limit?

Government portals, visa submission systems, and HR recruiting software handle millions of submissions daily. To avoid database bottlenecks, strict file size limits are enforced:
- **Visa & Passport Portals:** typically cap uploads at 100KB – 240KB.
- **Job Application & ATS Systems:** recommend avatars under 150KB for rapid recruiter loading.

When modern smartphone cameras capture photos ranging from 5MB to 20MB, uploads fail with error messages like *"File size exceeds maximum threshold"*.

---

## How to Compress Your Photo Under 100KB

### 1. Automated Target Sizing (Recommended)
1. Open the [Compress Image to 100KB Tool](/en/compress-image-to-100kb).
2. Drag and drop your image into the compressor.
3. The engine uses a binary-search optimization loop to find the exact sweet spot quality that fits under 100KB.
4. Download your certified lightweight file instantly.

### 2. Image Dimension Scaling
If a photo starts at 4000x3000 pixels, compression alone might degrade face details. Scaling down the dimensions to 1200x900 pixels reduces 70% of pixel payload before compression even starts. Use [Resize Image](/en/resize-image).

### 3. Stripping EXIF Metadata
Smartphones embed GPS coordinates and camera profiles into photos. Our engine removes these bytes, saving 20-50KB and protecting your privacy.
      `,
    },
    faq: {
      ru: [
        { q: 'Не забракуют ли сжатое фото на Госуслугах?', a: 'Нет, при правильном сжатии резкость лица и контуры сохраняются в идеальном качестве. Алгоритм компрессора удаляет лишь избыточную цветовую субдискретизацию.' },
        { q: 'Какой формат лучше выбрать для анкет?', a: 'Всегда выбирайте JPEG (JPG) — это самый поддерживаемый формат на всех государственных порталах РФ и мира.' },
      ],
      en: [
        { q: 'Will compressed photos be rejected by automated visa reviewers?', a: 'No, because our bicubic resampling preserves facial biometric outlines and clarity while cutting invisible redundant data.' },
        { q: 'Which format is best for official applications?', a: 'JPEG is universally accepted across all visa, passport, and government services.' },
      ],
    },
    relatedToolSlugs: ['szhat-foto-do-100-kb', 'szhat-jpeg', 'izmenit-razmer-foto'],
    relatedDocSlugs: ['webp-vs-jpeg-vs-png', 'lossy-vs-lossless-szhatie', 'konfidencialnost-klient-szhatie'],
  },
  {
    slug: 'webp-vs-jpeg-vs-png',
    category: {
      ru: 'Форматы и Технологии',
      en: 'Formats & Comparison',
    },
    title: {
      ru: 'WebP против JPEG и PNG: подробное сравнение форматов 2026 года',
      en: 'WebP vs JPEG vs PNG vs AVIF: The Ultimate 2026 Format Comparison',
    },
    metaTitle: {
      ru: 'WebP против JPEG и PNG: сравнение форматов, степень сжатия и поддержка',
      en: 'WebP vs JPEG vs PNG: 2026 Performance and Compression Comparison',
    },
    metaDescription: {
      ru: 'Детальное сравнение WebP, JPEG, PNG и AVIF. Таблица веса файлов, поддержка браузерами, сохранение прозрачности и влияние на скорость сайта.',
      en: 'Detailed comparison of WebP, JPEG, PNG, and AVIF. Compression ratios, browser compatibility, alpha channel transparency, and PageSpeed impact.',
    },
    readTime: '6 мин',
    datePublished: '2026-02-01',
    dateModified: '2026-09-12',
    summary: {
      ru: 'Какой формат выбрать для веб-сайта, фотографа или интернет-магазина? Разбираем сильные и слабые стороны WebP, PNG, JPEG и AVIF.',
      en: 'Which image format should you choose for web performance, photography, or e-commerce? Deep-dive into WebP, PNG, JPEG, and AVIF.',
    },
    content: {
      ru: `
## Эволюция форматов изображений

Десятилетиями интернет полагался на два классических формата:
- **JPEG (1992 г.):** идеален для фотографий благодаря алгоритму дискретно-косинусного преобразования (DCT), но не умеет работать с прозрачностью.
- **PNG (1996 г.):** стандарт для графики с прозрачностью (альфа-каналом), однако создающий тяжелые файлы при использовании для фото.

В 2010 году Google представил **WebP**, а современные веб-стандарты добавили **AVIF**.

---

## Сравнительная таблица форматов

| Параметр | JPEG | PNG | WebP | AVIF |
|---|---|---|---|---|
| **Тип сжатия** | С потерями (Lossy) | Без потерь (Lossless) | С потерями и без потерь | С потерями и без потерь |
| **Прозрачный фон** | ❌ Нет | ✅ Да (Альфа-канал) | ✅ Да (Альфа-канал) | ✅ Да |
| **Средняя экономия** | Базовый уровень | В 2-3 раза тяжелее | **На 30-40% меньше JPEG** | **На 50% меньше JPEG** |
| **Поддержка браузерами** | 100% | 100% | 97.5% (все современные) | ~93% |
| **Для чего идеален** | Печать, старые системы | Иконки, чертежи | Веб-сайты, блоги, магазины | Высокотехнологичные медиа |

---

## Когда и какой формат использовать?

### 1. Используйте WebP:
- Для всех изображений на коммерческих сайтах и блогах.
- Для баннеров, карточек товаров и иллюстраций с прозрачностью.
- Конвертируйте существующие файлы через [Конвертер PNG в WebP](/ru/konvertirovat-png-v-webp) или [JPG в WebP](/ru/konvertirovat-jpg-v-webp).

### 2. Используйте JPEG:
- Когда требуется максимальная совместимость со старыми программами (например, Word 2007, старые версии Photoshop).
- Для подачи официальных документов в госорганы. Сжимайте их инструментом [Сжать JPEG](/ru/szhat-jpeg).

### 3. Используйте PNG:
- Для исходников логотипов в высоком разрешении.
- Для скриншотов с мелким текстом и таблицами, где любая потеря резкости недопустима. Сжимайте через [Сжать PNG](/ru/szhat-png).
      `,
      en: `
## Format Comparison Overview

For over two decades, the web relied on two giants: **JPEG** for photographic content and **PNG** for transparent graphics.

Google introduced **WebP** to unify these benefits: high photographic compression with full 8-bit alpha transparency.

---

## Benchmark Matrix

| Feature | JPEG | PNG | WebP | AVIF |
|---|---|---|---|---|
| **Compression Mode** | Lossy | Lossless | Lossy + Lossless | Lossy + Lossless |
| **Alpha Transparency** | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes |
| **File Footprint** | Baseline | 2-3x heavier | **30-40% lighter than JPG** | **50% lighter than JPG** |
| **Global Compatibility** | 100% | 100% | 97.5%+ | ~93% |
| **Optimal Use Case** | Legacy print & forms | Raw design masters | Modern web, shop catalogs | Next-gen streaming/media |

---

## Which Format Should You Choose?

- Convert graphics with our [Convert PNG to WebP tool](/en/convert-png-to-webp) to save up to 80% bandwidth.
- For photos, use [Convert JPG to WebP](/en/convert-jpg-to-webp) or [Compress JPEG](/en/compress-jpeg).
      `,
    },
    faq: {
      ru: [
        { q: 'Правда ли, что WebP ускоряет загрузку сайта?', a: 'Да. Переход на WebP снижает объем передаваемого трафика на 30-50%, что напрямую улучшает показатель LCP (Largest Contentful Paint) в Google Core Web Vitals.' },
        { q: 'Может ли WebP заменить PNG для прозрачных логотипов?', a: 'Да, WebP поддерживает прозрачность без видимой деградации краев и весит в несколько раз меньше PNG.' },
      ],
      en: [
        { q: 'Does WebP really boost page speed?', a: 'Yes. Replacing JPEG and PNG assets with WebP slashes network payloads by 30-50%, directly improving Google Core Web Vitals LCP.' },
      ],
    },
    relatedToolSlugs: ['konvertirovat-png-v-webp', 'konvertirovat-jpg-v-webp', 'szhat-webp', 'szhat-png'],
    relatedDocSlugs: ['optimizaciya-kartinok-dlya-sayta', 'lossy-vs-lossless-szhatie'],
  },
  {
    slug: 'optimizaciya-kartinok-dlya-sayta',
    category: {
      ru: 'Веб-разработка и SEO',
      en: 'Web Performance & SEO',
    },
    title: {
      ru: 'Оптимизация изображений для сайта: как разогнать Google PageSpeed до 100 баллов',
      en: 'Image Optimization for Websites: How to Score 100 on Google PageSpeed Insights',
    },
    metaTitle: {
      ru: 'Оптимизация картинок для сайта: руководство по ускорению загрузки и SEO',
      en: 'Image Optimization Guide: Boost PageSpeed and Core Web Vitals',
    },
    metaDescription: {
      ru: 'Практическое руководство: как правильно сжимать картинки для сайта, настроить форматы WebP, ленивую загрузку (lazy loading) и пройти проверки Google PageSpeed.',
      en: 'Actionable guide on optimizing web imagery: WebP conversion, responsive sizing, lazy loading, and passing Core Web Vitals audits.',
    },
    readTime: '7 мин',
    datePublished: '2026-02-10',
    dateModified: '2026-09-14',
    summary: {
      ru: 'Тяжелые картинки — причина №1 медленных сайтов и падения позиций в Яндексе и Google. Узнайте, как оптимизировать визуал без ущерба для дизайна.',
      en: 'Bloated images are the primary cause of sluggish page loading and poor search rankings. Master image optimization techniques for top SEO performance.',
    },
    content: {
      ru: `
## Почему скорость загрузки критична для SEO в 2026 году?

Поисковые системы Яндекс и Google официально учитывают скорость сайта в формуле ранжирования:
1. **Google Core Web Vitals:** Метрика **LCP (Largest Contentful Paint)** измеряет время отрисовки главного видимого элемента экрана (чаще всего это главный баннер или фото товара). Норма — до 2.5 секунд.
2. **Яндекс:** Пользователи со смартфонов уходят со страницы, если она грузится дольше 3 секунд, что резко ухудшает поведенческие факторы (bounce rate).

В среднем более **65% общего веса интернет-страницы** приходится на графические файлы.

---

## 5 шагов к 100 баллам в PageSpeed Insights

### 1. Приведите разрешение к реальным размерам контейнера
Не загружайте на сайт фото размером 4000x3000 пикселей, если на экране оно отображается в блоке 800x600 px. Используйте наш инструмент [Изменить размер фото](/ru/izmenit-razmer-foto).

### 2. Конвертируйте в WebP
Перевод каталога изображений в WebP экономит десятки гигабайт серверного трафика. Воспользуйтесь [Конвертером PNG в WebP](/ru/konvertirovat-png-v-webp).

### 3. Настройте сжатие с оптимальным качеством (80-85%)
Человеческий глаз не видит разницы между 100% качеством и 82%, однако размер файла отличается в 3-4 раза. Быстро обработать пакет фото можно через [Сжать JPEG онлайн](/ru/szhat-jpeg).

### 4. Внедрите Lazy Loading (Ленивую загрузку)
Добавляйте атрибут \`loading="lazy"\` ко всем картинкам ниже первого экрана:
\`\`\`html
<img src="product.webp" alt="Товар" loading="lazy" width="600" height="400" />
\`\`\`

### 5. Всегда указывайте ширину (width) и высоту (height)
Это предотвращает скачки макета — метрику **CLS (Cumulative Layout Shift)**.
      `,
      en: `
## Why Page Speed Matters for Organic Rankings

Search engines prioritize fast-rendering experiences:
1. **Google Core Web Vitals:** **LCP (Largest Contentful Paint)** is directly bounded by hero banner load time. Target is <= 2.5 seconds.
2. **User Retention:** Over 53% of mobile visitors abandon sites taking longer than 3 seconds to load.

---

## 5 Practical Steps to Master PageSpeed

1. **Serve Responsive Dimensions:** Never serve a 4000px wide image into an 800px column. Use [Resize Image](/en/resize-image).
2. **Adopt Next-Gen WebP:** Shrink asset weight by 40% with [Convert PNG to WebP](/en/convert-png-to-webp).
3. **Calibrate Compression to 80%:** Visually identical to lossless, but reduces file size significantly with [Compress JPEG](/en/compress-jpeg).
4. **Leverage Native Lazy Loading:** Apply \`loading="lazy"\` on below-the-fold media.
5. **Declare Width & Height Attributes:** Eliminates Cumulative Layout Shift (CLS).
      `,
    },
    faq: {
      ru: [
        { q: 'Какой размер фото считается нормальным для сайта?', a: 'Для главного баннера — до 120-180 КБ. Для карточек товаров — до 40-70 КБ. Для иконок — до 5-15 КБ.' },
      ],
      en: [
        { q: 'What is a good target file size for website photos?', a: 'Hero banners: under 150KB. Product thumbnails: 30-70KB. Icons: under 15KB.' },
      ],
    },
    relatedToolSlugs: ['szhat-webp', 'konvertirovat-png-v-webp', 'izmenit-razmer-foto'],
    relatedDocSlugs: ['webp-vs-jpeg-vs-png', 'lossy-vs-lossless-szhatie'],
  },
  {
    slug: 'lossy-vs-lossless-szhatie',
    category: {
      ru: 'Теория и Алгоритмы',
      en: 'Algorithms & Theory',
    },
    title: {
      ru: 'Сжатие с потерями (Lossy) и без потерь (Lossless): в чём разница и что выбрать',
      en: 'Lossy vs Lossless Image Compression: Complete Technical Guide',
    },
    metaTitle: {
      ru: 'Сжатие с потерями и без потерь: разница, алгоритмы и примеры',
      en: 'Lossy vs Lossless Compression: Key Differences & Examples',
    },
    metaDescription: {
      ru: 'Понятный разбор: что такое Lossy и Lossless компрессия, как они работают под капотом, и какой тип сжатия выбрать для фото, документов или логотипов.',
      en: 'Understand how lossy and lossless algorithms work under the hood. When to preserve raw bits vs when to maximize bandwidth savings.',
    },
    readTime: '5 мин',
    datePublished: '2026-02-18',
    dateModified: '2026-09-12',
    summary: {
      ru: 'Главная дилемма оптимизации файлов: идеальная точность каждого пикселя или максимальное уменьшение веса? Разбираемся в механике алгоритмов.',
      en: 'The fundamental tradeoff in digital graphics: bit-for-bit mathematical precision vs extreme bandwidth savings. Discover which one suits your project.',
    },
    content: {
      ru: `
## В чем фундаментальная разница?

- **Сжатие без потерь (Lossless):** Восстанавливает исходные данные с точностью до каждого отдельного бита. По принципу работы похоже на ZIP-архив. Ни один пиксель не искажается, но экономия объема редко превышает 20–30%.
- **Сжатие с потерями (Lossy):** Отбрасывает ту визуальную информацию, к которой человеческий глаз наименее чувствителен (незначительные перепады оттенков в сложных градиентах). Позволяет уменьшить файл на **70–90%**!

---

## Как это устроено внутри?

### Механика Lossy (JPEG, WebP)
1. **Цветовая субдискретизация (Chroma Subsampling):** Человеческий глаз намного лучше различает перепады яркости, чем тонкие цветовые нюансы. Алгоритм сжимает цветность сильнее, чем яркость.
2. **Дискретное косинусное преобразование (DCT):** Разбивает изображение на блоки 8x8 пикселей и удаляет высокочастотный шум.
3. **Квантование:** Округление коэффициентов, степень которого регулирует ползунок качества.

### Механика Lossless (PNG, WebP Lossless)
1. **Фильтрация строк:** Вычитание значений соседних пикселей для получения повторяющихся нулей.
2. **Алгоритм Deflate (LZ77 + Кодирование Хаффмана):** Замена повторяющихся цепочек байт на короткие ссылки.

---

## Что выбрать вам?

- **Фотографии, соцсети, веб-страницы:** Всегда выбирайте сжатие с потерями при качестве 80%. Используйте [Сжать JPEG](/ru/szhat-jpeg).
- **Скрины интерфейсов, диаграммы, чертежи:** Выбирайте PNG сжатие без потерь: [Сжать PNG](/ru/szhat-png).
- **Официальные анкеты с лимитом веса:** Используйте [Сжать фото до 100 КБ](/ru/szhat-foto-do-100-kb).
      `,
      en: `
## Core Difference Explained

- **Lossless Compression:** Reconstructs original bits with 100% mathematical fidelity (similar to ZIP). Perfect for diagrams, text, and vector masks.
- **Lossy Compression:** Eliminates color frequencies imperceptible to human vision, slashing file sizes by **70% to 90%** without noticeable distortion.

---

## Which Mode Should You Pick?

- For photographs and web content: use lossy compression at 80% quality via [Compress JPEG](/en/compress-jpeg).
- For charts, schematics, and text screenshots: use [Compress PNG](/en/compress-png).
- For strict government portal caps: use [Compress Image to 100KB](/en/compress-image-to-100kb).
      `,
    },
    faq: {
      ru: [
        { q: 'Можно ли восстановить качество после сжатия с потерями?', a: 'Нет. Удаленные алгоритмом данные теряются навсегда. Поэтому всегда сохраняйте исходный оригинал при профессиональной обработке.' },
      ],
      en: [
        { q: 'Can lossy compression be reversed back to original quality?', a: 'No, discarded information is permanently removed. Always keep your raw master files.' },
      ],
    },
    relatedToolSlugs: ['szhat-jpeg', 'szhat-png', 'szhat-webp'],
    relatedDocSlugs: ['kak-szhat-foto-do-100-kb', 'webp-vs-jpeg-vs-png'],
  },
  {
    slug: 'konfidencialnost-klient-szhatie',
    category: {
      ru: 'Безопасность и Приватность',
      en: 'Privacy & Security',
    },
    title: {
      ru: 'Безопасность и приватность: почему сжатие в браузере надежнее облачных сервисов',
      en: 'Security & Privacy: Why In-Browser Processing Beats Cloud Services',
    },
    metaTitle: {
      ru: 'Приватное сжатие фото в браузере: защита персональных данных онлайн',
      en: 'Private In-Browser Image Processing vs Cloud Uploads',
    },
    metaDescription: {
      ru: 'Почему нельзя загружать фото паспортов и документов на обычные сайты-компрессоры. Преимущества технологии Client-Side Canvas обработки данных.',
      en: 'Why uploading passport photos and ID cards to cloud compressors is risky. How client-side Canvas API protects your confidential data.',
    },
    readTime: '4 мин',
    datePublished: '2026-03-01',
    dateModified: '2026-09-15',
    summary: {
      ru: 'Ежедневно тысячи людей загружают сканы паспортов на неизвестные облачные сервисы для уменьшения веса. Разбираем, чем это опасно и как работает безопасная альтернатива.',
      en: 'Every day thousands of people upload ID scans to third-party cloud servers just to shrink file sizes. Discover the safer client-side browser approach.',
    },
    content: {
      ru: `
## Опасность загрузки документов в облачные компрессоры

Большинство традиционных сервисов сжатия работают по старой клиент-серверной схеме:
1. Вы перетаскиваете фото паспорта на сайт.
2. Файл целиком отправляется на удаленный сервер в неизвестной юрисдикции.
3. Сервер обрабатывает файл библиотекой (ImageMagick/libvips) и сохраняет его на своем диске.
4. Вы скачиваете результат.

**В чем риски такой схемы?**
- Сервер может сохранять копии ваших персональных данных (утечки баз данных случаются регулярно).
- Передача файла по открытым или скомпрометированным сетям может быть перехвачена.
- Риск кражи биометрии и данных документов для мошеннических действий.

---

## Как работает наше клиентское сжатие (Client-Side)?

Наш сервис использует новейшие возможности спецификации **HTML5 Canvas API** и **OffscreenCanvas**:
1. Ваш файл считывается встроенным движком JavaScript непосредственно из оперативной памяти вашего компьютера или телефона.
2. Графический чип (GPU) или процессор вашего устройства выполняет масштабирование и квантование матрицы пикселей локально.
3. Готовый файл генерируется в виде локального Blob-объекта прямо в браузере.
4. **Ни один байт изображения не отправляется в интернет!** Вы можете даже отключить Wi-Fi после открытия сайта, и компрессор продолжит работать в офлайн-режиме.

Попробуйте обработать документы в безопасном режиме: [Сжать фото до 100 КБ](/ru/szhat-foto-do-100-kb).
      `,
      en: `
## The Hidden Vulnerability of Cloud Compression Tools

Conventional compressors upload user images to remote cloud servers for batch processing. This introduces serious privacy risks when dealing with passports, driver licenses, or sensitive contracts:
- Files may be cached or retained in temporary server storage.
- Exposure to third-party data breaches.

---

## In-Browser Zero-Knowledge Processing

Our architecture leverages native **HTML5 Canvas API**:
1. Files are loaded strictly into your local browser memory space.
2. Compression calculations execute directly on your local CPU/GPU.
3. A download Blob is generated locally.
4. **Zero network payloads are transmitted.** You can literally disconnect your internet connection and the compressor will keep functioning flawlessly!

Test our secure tool: [Compress Image to 100KB](/en/compress-image-to-100kb).
      `,
    },
    faq: {
      ru: [
        { q: 'Как убедиться, что фото действительно не отправляется в сеть?', a: 'Откройте панель разработчика браузера (F12), перейдите на вкладку «Сеть» (Network) и сожмите фото. Вы увидите, что сетевые запросы с загрузкой файла отсутствуют.' },
      ],
      en: [
        { q: 'How can I verify no photos are uploaded?', a: 'Press F12 to inspect Developer Tools, navigate to the Network tab, and process an image. You will observe zero upload requests.' },
      ],
    },
    relatedToolSlugs: ['szhat-foto-do-100-kb', 'szhat-jpeg'],
    relatedDocSlugs: ['kak-szhat-foto-do-100-kb', 'lossy-vs-lossless-szhatie'],
  },
];

export function getDocArticleBySlug(slug: string): DocArticle | undefined {
  return DOCS_DATA.find((doc) => doc.slug === slug);
}
