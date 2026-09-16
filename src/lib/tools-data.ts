import { ToolLandingData } from './types';

export const TOOLS_DATA: ToolLandingData[] = [
  {
    slug: {
      ru: 'szhat-jpeg',
      en: 'compress-jpeg',
    },
    title: {
      ru: 'Сжать JPEG онлайн',
      en: 'Compress JPEG Online',
    },
    metaTitle: {
      ru: 'Сжать JPEG онлайн бесплатно без потери качества — СжатьФото',
      en: 'Compress JPEG Images Online Free - Lossless Quality | CompressPhoto',
    },
    metaDescription: {
      ru: 'Уменьшите размер файлов JPEG и JPG онлайн за секунды. Без потери четкости, прямо в браузере, без отправки на сервер. Бесплатно и безопасно.',
      en: 'Reduce JPEG and JPG file size online in seconds. Preserve visual sharpness directly in your browser with zero server uploads. Free and private.',
    },
    h1: {
      ru: 'Сжать JPEG и JPG онлайн без потери качества',
      en: 'Compress JPEG & JPG Images Online Without Quality Loss',
    },
    subtitle: {
      ru: 'Уменьшите размер фотографий JPEG до 85% прямо на вашем устройстве. Быстро, безопасно и без водяных знаков.',
      en: 'Shrink JPEG photo file sizes by up to 85% directly on your device. Fast, private, and watermark-free.',
    },
    defaultSettings: {
      format: 'image/jpeg',
      quality: 80,
      stripMetadata: true,
    },
    features: {
      ru: [
        { title: 'Адаптивное сжатие DCT', desc: 'Удаляет невидимую глазу избыточную цветовую информацию, сохраняя контуры и резкость.' },
        { title: 'Очистка EXIF данных', desc: 'Удаляет геолокацию и метаданные камеры, уменьшая размер файла еще на 10-15%.' },
        { title: 'Пакетная обработка', desc: 'Загружайте десятки фотографий сразу и скачивайте результат в одном ZIP-архиве.' },
      ],
      en: [
        { title: 'Adaptive DCT Compression', desc: 'Removes imperceptible high-frequency chroma data while keeping crisp edges.' },
        { title: 'EXIF Metadata Stripping', desc: 'Strips GPS tags and camera metadata, shaving off an extra 10-15% file size.' },
        { title: 'Batch Processing', desc: 'Drop dozens of photos simultaneously and download all results in a neat ZIP archive.' },
      ],
    },
    howToSteps: {
      ru: [
        { step: 'Шаг 1: Загрузка', text: 'Перетащите ваши файлы JPEG/JPG в окно компрессора или выберите их с диска.' },
        { step: 'Шаг 2: Настройка', text: 'Установите желаемое качество (по умолчанию 80% дает идеальный баланс).' },
        { step: 'Шаг 3: Скачивание', text: 'Нажмите «Скачать» для нужного файла или «Скачать всё» для получения ZIP-архива.' },
      ],
      en: [
        { step: 'Step 1: Upload', text: 'Drag & drop your JPEG/JPG files into the compressor zone or select from disk.' },
        { step: 'Step 2: Adjust', text: 'Select desired quality level (80% default gives optimal visual balance).' },
        { step: 'Step 3: Download', text: 'Click "Download" for individual images or "Download All" for a combined ZIP.' },
      ],
    },
    faq: {
      ru: [
        { q: 'Ухудшится ли качество JPEG при сжатии?', a: 'При уровне качества 75-85% разница неразличима человеческим глазом даже на Retina-дисплеях, а вес файла сокращается в 3-5 раз.' },
        { q: 'Безопасно ли сжимать личные фотографии?', a: 'Да, наш сервис использует Web Canvas API. Фотографии обрабатываются в оперативной памяти вашего браузера и никуда не передаются по сети.' },
        { q: 'Чем отличается JPG от JPEG?', a: 'Это один и тот же формат. Расширение .jpg появилось в старых версиях Windows (MS-DOS) из-за ограничения длины расширения в 3 символа.' },
      ],
      en: [
        { q: 'Will JPEG quality degrade upon compression?', a: 'At 75-85% quality setting, visual degradation is imperceptible to human eyes while reducing file size by 3-5x.' },
        { q: 'Is it safe to compress sensitive personal photos?', a: 'Yes. Our compressor runs 100% locally via Canvas API. Files are processed in your browser memory and never uploaded to servers.' },
        { q: 'What is the difference between JPG and JPEG?', a: 'They are identical. The .jpg 3-letter extension was popularized due to legacy 8.3 filename limitations on MS-DOS.' },
      ],
    },
    relatedTools: ['szhat-png', 'szhat-webp', 'konvertirovat-jpg-v-webp', 'szhat-foto-do-100-kb'],
    relatedDocSlugs: ['kak-szhat-foto-do-100-kb', 'lossy-vs-lossless-szhatie', 'webp-vs-jpeg-vs-png'],
  },
  {
    slug: {
      ru: 'szhat-png',
      en: 'compress-png',
    },
    title: {
      ru: 'Сжать PNG онлайн',
      en: 'Compress PNG Online',
    },
    metaTitle: {
      ru: 'Сжать PNG с сохранением прозрачности онлайн — СжатьФото',
      en: 'Compress PNG with Transparency Preserved Online | CompressPhoto',
    },
    metaDescription: {
      ru: 'Уменьшите вес картинок PNG без потери прозрачности альфа-канала. Оптимизация логотипов, иконок и графики в браузере бесплатно.',
      en: 'Reduce PNG image size while preserving transparent alpha channels. In-browser optimization for logos, icons, and UI graphics.',
    },
    h1: {
      ru: 'Сжать PNG онлайн с сохранением прозрачности',
      en: 'Compress PNG Online with Transparency Preserved',
    },
    subtitle: {
      ru: 'Оптимизируйте графику, логотипы и скриншоты PNG без размытия текста и искажения цветов.',
      en: 'Optimize PNG graphics, UI mockups, and logos without text blurriness or alpha channel loss.',
    },
    defaultSettings: {
      format: 'image/png',
      quality: 90,
      stripMetadata: true,
    },
    features: {
      ru: [
        { title: 'Сохранение прозрачности', desc: 'Альфа-канал и прозрачный фон остаются нетронутыми — идеально для логотипов и иконок.' },
        { title: 'Четкие контуры текста', desc: 'В отличие от JPEG, PNG не создает артефактов вокруг надписей и линий диаграмм.' },
        { title: 'Конвертация в WebP в 1 клик', desc: 'Хотите сэкономить до 80%? Переключите формат в WebP без потери прозрачности!' },
      ],
      en: [
        { title: 'Alpha Channel Preserved', desc: 'Transparencies and masks remain pixel-perfect — ideal for logos and vector icons.' },
        { title: 'Crisp Text Edges', desc: 'Unlike JPEG, PNG compression produces no ringing artifacts around typography and diagram lines.' },
        { title: '1-Click WebP Conversion', desc: 'Want 80% extra compression? Switch output format to WebP while retaining full transparency!' },
      ],
    },
    howToSteps: {
      ru: [
        { step: 'Шаг 1: Загрузка PNG', text: 'Перетащите изображения PNG в область загрузки или нажмите Ctrl+V для скриншота.' },
        { step: 'Шаг 2: Выбор параметров', text: 'Выберите сохранение в формате PNG или конвертацию в легкий WebP с прозрачностью.' },
        { step: 'Шаг 3: Сохранение', text: 'Скачайте готовые легковесные изображения на компьютер или телефон.' },
      ],
      en: [
        { step: 'Step 1: Upload PNG', text: 'Drag & drop PNG files into the upload area or paste directly via Ctrl+V.' },
        { step: 'Step 2: Choose Settings', text: 'Keep PNG format or convert to modern WebP with full transparency support.' },
        { step: 'Step 3: Save', text: 'Download lightweight optimized images to your desktop or mobile device.' },
      ],
    },
    faq: {
      ru: [
        { q: 'Почему файлы PNG такие тяжелые?', a: 'PNG использует алгоритм сжатия без потерь (Deflate), сохраняя каждый пиксель. Для фото лучше использовать JPEG или WebP, а PNG оставить для графики.' },
        { q: 'Сохранится ли прозрачный фон?', a: 'Да, при выборе формата PNG или WebP прозрачность сохраняется на 100%.' },
      ],
      en: [
        { q: 'Why are PNG files generally so large?', a: 'PNG uses lossless Deflate compression preserving exact pixel grids. For photos, consider WebP or JPEG instead.' },
        { q: 'Is transparency preserved?', a: 'Yes, when exporting to PNG or WebP, the alpha channel transparency is fully maintained.' },
      ],
    },
    relatedTools: ['szhat-jpeg', 'konvertirovat-png-v-webp', 'szhat-webp'],
    relatedDocSlugs: ['webp-vs-jpeg-vs-png', 'optimizaciya-kartinok-dlya-sayta'],
  },
  {
    slug: {
      ru: 'szhat-webp',
      en: 'compress-webp',
    },
    title: {
      ru: 'Сжать WebP онлайн',
      en: 'Compress WebP Online',
    },
    metaTitle: {
      ru: 'Сжать WebP онлайн бесплатно — уменьшить размер изображений WebP',
      en: 'Compress WebP Images Online Free - Shrink WebP Files | CompressPhoto',
    },
    metaDescription: {
      ru: 'Уменьшите размер файлов формата WebP прямо в браузере. Идеально для оптимизации сайтов, интернет-магазинов и улучшения показателей Core Web Vitals.',
      en: 'Reduce WebP image file sizes right in your browser. Perfect for speeding up websites and boosting Google Core Web Vitals.',
    },
    h1: {
      ru: 'Сжать WebP изображения онлайн',
      en: 'Compress WebP Images Online',
    },
    subtitle: {
      ru: 'Современное сжатие нового поколения: получите максимальную скорость загрузки вашего сайта.',
      en: 'Next-generation image compression: achieve maximum page speed for your web projects.',
    },
    defaultSettings: {
      format: 'image/webp',
      quality: 80,
      stripMetadata: true,
    },
    features: {
      ru: [
        { title: 'Формат нового поколения', desc: 'WebP на 30-40% компактнее JPEG при идентичном визуальном восприятии.' },
        { title: 'Поддержка Google PageSpeed', desc: 'Удовлетворяет рекомендацию Google «Используйте современные форматы изображений».' },
        { title: 'Мгновенная обработка', desc: 'Браузерные движки нативно оптимизированы под кодирование WebP.' },
      ],
      en: [
        { title: 'Next-Gen Format', desc: 'WebP is 30-40% smaller than standard JPEG at identical perceived fidelity.' },
        { title: 'Google PageSpeed Ready', desc: 'Fulfills Google PageSpeed "Serve images in next-gen formats" audits.' },
        { title: 'Native In-Browser Speed', desc: 'Modern browsers feature hardware-accelerated WebP encoding.' },
      ],
    },
    howToSteps: {
      ru: [
        { step: 'Шаг 1: Добавьте WebP', text: 'Загрузите файлы WebP в компрессор.' },
        { step: 'Шаг 2: Отрегулируйте сжатие', text: 'Установите ползунок качества от 70 до 85%.' },
        { step: 'Шаг 3: Скачайте архив', text: 'Получите оптимизированные файлы для веб-сайта.' },
      ],
      en: [
        { step: 'Step 1: Add WebP', text: 'Upload WebP files into the compressor.' },
        { step: 'Step 2: Adjust Quality', text: 'Set the quality slider between 70% and 85%.' },
        { step: 'Step 3: Download', text: 'Save lightweight assets ready for production websites.' },
      ],
    },
    faq: {
      ru: [
        { q: 'Поддерживают ли все браузеры формат WebP?', a: 'Да, WebP поддерживается всеми современными браузерами (Chrome, Safari, Firefox, Edge, Яндекс.Браузер) с долей поддержки свыше 97%.' },
        { q: 'Поддерживает ли WebP прозрачность?', a: 'Да, WebP поддерживает прозрачный фон так же, как PNG, но при значительно меньшем объеме файла.' },
      ],
      en: [
        { q: 'Do all browsers support WebP?', a: 'Yes! WebP enjoys over 97% global browser support across Chrome, Safari, Edge, and Firefox.' },
        { q: 'Does WebP support transparency?', a: 'Yes, WebP supports full alpha transparency just like PNG but at a fraction of the file size.' },
      ],
    },
    relatedTools: ['konvertirovat-png-v-webp', 'konvertirovat-jpg-v-webp', 'szhat-jpeg'],
    relatedDocSlugs: ['webp-vs-jpeg-vs-png', 'optimizaciya-kartinok-dlya-sayta'],
  },
  {
    slug: {
      ru: 'konvertirovat-png-v-webp',
      en: 'convert-png-to-webp',
    },
    title: {
      ru: 'Конвертировать PNG в WebP',
      en: 'Convert PNG to WebP',
    },
    metaTitle: {
      ru: 'Конвертировать PNG в WebP онлайн бесплатно с прозрачностью — СжатьФото',
      en: 'Convert PNG to WebP Online Free - Alpha Transparency | CompressPhoto',
    },
    metaDescription: {
      ru: 'Быстрая конвертация изображений PNG в современный формат WebP с сохранением прозрачности. Уменьшение размера файлов до 80% прямо в браузере.',
      en: 'Fast online conversion from PNG to modern WebP format with full alpha transparency. Slash file sizes by up to 80% locally in your browser.',
    },
    h1: {
      ru: 'Конвертировать PNG в WebP онлайн',
      en: 'Convert PNG to WebP Online Free',
    },
    subtitle: {
      ru: 'Сократите размер картинок до 80% с полным сохранением прозрачности и четкости.',
      en: 'Cut image file sizes by up to 80% while retaining transparent backgrounds and crisp edges.',
    },
    defaultSettings: {
      format: 'image/webp',
      quality: 85,
      stripMetadata: true,
    },
    features: {
      ru: [
        { title: 'До 80% экономии веса', desc: 'WebP сжимает графику с прозрачностью во много раз эффективнее устаревшего PNG.' },
        { title: 'Без потери прозрачности', desc: 'Полупрозрачные тени, градиенты и маски сохраняют безупречный вид.' },
        { title: 'Идеально для веб-мастеров', desc: 'Ускоряет загрузку интернет-магазинов, блогов и мобильных приложений.' },
      ],
      en: [
        { title: 'Up to 80% Size Reduction', desc: 'WebP handles transparent graphics drastically better than legacy PNG.' },
        { title: 'Flawless Alpha Transparency', desc: 'Soft drop shadows, glows, and masks render seamlessly.' },
        { title: 'Tailored for Web Developers', desc: 'Speeds up ecommerce storefronts, landing pages, and web apps.' },
      ],
    },
    howToSteps: {
      ru: [
        { step: 'Шаг 1: Загрузка', text: 'Загрузите один или несколько файлов PNG.' },
        { step: 'Шаг 2: Конвертация', text: 'Формат WebP выбран автоматически. Отрегулируйте качество при необходимости.' },
        { step: 'Шаг 3: Сохранение', text: 'Скачайте готовые WebP файлы поштучно или единым архивом.' },
      ],
      en: [
        { step: 'Step 1: Upload', text: 'Drop one or multiple PNG files.' },
        { step: 'Step 2: Convert', text: 'WebP is pre-selected. Tweak quality if desired.' },
        { step: 'Step 3: Download', text: 'Grab your new WebP assets individually or in a ZIP archive.' },
      ],
    },
    faq: {
      ru: [
        { q: 'Поддерживает ли WebP прозрачный фон?', a: 'Да! WebP полностью поддерживает альфа-канал прозрачности, при этом файл весит на 50-80% меньше, чем исходный PNG.' },
      ],
      en: [
        { q: 'Does WebP support transparent backgrounds?', a: 'Absolutely. WebP includes full alpha transparency support at a fraction of PNG file sizes.' },
      ],
    },
    relatedTools: ['konvertirovat-jpg-v-webp', 'szhat-png', 'szhat-webp'],
    relatedDocSlugs: ['webp-vs-jpeg-vs-png', 'optimizaciya-kartinok-dlya-sayta'],
  },
  {
    slug: {
      ru: 'konvertirovat-jpg-v-webp',
      en: 'convert-jpg-to-webp',
    },
    title: {
      ru: 'Конвертировать JPG в WebP',
      en: 'Convert JPG to WebP',
    },
    metaTitle: {
      ru: 'Конвертировать JPG в WebP онлайн бесплатно — СжатьФото',
      en: 'Convert JPG to WebP Online Free - Lossless & Lossy | CompressPhoto',
    },
    metaDescription: {
      ru: 'Конвертируйте фото JPG и JPEG в формат WebP онлайн. Уменьшение размера до 40% без потери качества. Быстро, бесплатно, безопасно.',
      en: 'Convert JPG and JPEG photos to WebP online. Shrink sizes by up to 40% with zero visible quality loss. Free, fast, and secure.',
    },
    h1: {
      ru: 'Конвертировать JPG в WebP онлайн',
      en: 'Convert JPG to WebP Online',
    },
    subtitle: {
      ru: 'Переведите ваши фотографии в формат будущего WebP за 1 секунду прямо в браузере.',
      en: 'Upgrade your photo assets to modern WebP in seconds right inside your browser.',
    },
    defaultSettings: {
      format: 'image/webp',
      quality: 82,
      stripMetadata: true,
    },
    features: {
      ru: [
        { title: 'Меньший вес при том же качестве', desc: 'WebP сохраняет тонкие детали текстур и градиенты лучше JPEG.' },
        { title: 'Безопасно и приватно', desc: 'Обработка локально на вашем ПК или смартфоне.' },
        { title: 'Пакетная конвертация', desc: 'Конвертируйте сотни картинок сразу.' },
      ],
      en: [
        { title: 'Smaller Footprint at Same Quality', desc: 'WebP preserves delicate photographic textures superior to JPEG.' },
        { title: 'Private & Secure', desc: 'Processing happens locally on your machine.' },
        { title: 'Batch Conversion', desc: 'Convert entire folders of photos in one go.' },
      ],
    },
    howToSteps: {
      ru: [
        { step: 'Шаг 1', text: 'Загрузите файлы JPG/JPEG.' },
        { step: 'Шаг 2', text: 'Укажите желаемое качество сжатия.' },
        { step: 'Шаг 3', text: 'Скачайте готовые WebP файлы.' },
      ],
      en: [
        { step: 'Step 1', text: 'Upload JPG/JPEG files.' },
        { step: 'Step 2', text: 'Set desired quality level.' },
        { step: 'Step 3', text: 'Download converted WebP images.' },
      ],
    },
    faq: {
      ru: [
        { q: 'Зачем конвертировать JPG в WebP?', a: 'WebP загружается сайтами на 30-40% быстрее, что улучшает поведенческие факторы и позиции сайта в поиске Google и Яндекс.' },
      ],
      en: [
        { q: 'Why convert JPG to WebP?', a: 'WebP files load up to 40% faster, improving Core Web Vitals and search rankings.' },
      ],
    },
    relatedTools: ['szhat-jpeg', 'szhat-webp', 'konvertirovat-png-v-webp'],
    relatedDocSlugs: ['webp-vs-jpeg-vs-png', 'optimizaciya-kartinok-dlya-sayta'],
  },
  {
    slug: {
      ru: 'szhat-foto-do-100-kb',
      en: 'compress-image-to-100kb',
    },
    title: {
      ru: 'Сжать фото до 100 КБ',
      en: 'Compress Image to 100KB',
    },
    metaTitle: {
      ru: 'Сжать фото до 100 КБ онлайн для Госуслуг, резюме и виз — СжатьФото',
      en: 'Compress Image to 100KB Online for Resumes, Visas & Forms | CompressPhoto',
    },
    metaDescription: {
      ru: 'Уменьшите размер фото строго до 100 КБ или 200 КБ онлайн. Идеально для портала Госуслуг, анкет на загранпаспорт, шенгенских виз и резюме.',
      en: 'Compress photos strictly under 100KB or 200KB online. Perfect for official applications, passports, visa forms, and resumes.',
    },
    h1: {
      ru: 'Сжать фото до 100 КБ онлайн для Госуслуг и виз',
      en: 'Compress Image to Under 100KB Online',
    },
    subtitle: {
      ru: 'Умный алгоритм автоматически подберет параметры сжатия, чтобы файл весил меньше 100 КБ с максимальной четкостью.',
      en: 'Smart iterative compression automatically adjusts quality to fit under 100KB with maximum clarity.',
    },
    defaultSettings: {
      format: 'image/jpeg',
      quality: 75,
      targetMaxKb: 100,
      stripMetadata: true,
    },
    features: {
      ru: [
        { title: 'Строго в рамках лимита', desc: 'Алгоритм бинарного поиска гарантирует, что файл не превысит 100 КБ (или заданный лимит).' },
        { title: 'Для Госуслуг и загранпаспорта', desc: 'Удовлетворяет строгим требованиям государственных порталов и визовых центров.' },
        { title: 'Без отправки документов в сеть', desc: 'Паспортные фото и личные документы обрабатываются только на вашем компьютере.' },
      ],
      en: [
        { title: 'Strict File Size Limit', desc: 'Binary search ensures your file never exceeds the target 100KB threshold.' },
        { title: 'Passport & Visa Compliant', desc: 'Meets strict guidelines of government portals and job application systems.' },
        { title: 'Sensitive Documents Safe', desc: 'ID and passport photos never touch any remote server.' },
      ],
    },
    howToSteps: {
      ru: [
        { step: 'Шаг 1: Загрузка документа или фото', text: 'Загрузите фотографию для анкеты или скан документа.' },
        { step: 'Шаг 2: Целевой размер', text: 'Лимит «100 КБ» уже активирован. При необходимости измените его на 200 или 300 КБ.' },
        { step: 'Шаг 3: Получение готового файла', text: 'Скачайте готовое фото с гарантированным весом до 100 КБ.' },
      ],
      en: [
        { step: 'Step 1: Upload photo or scan', text: 'Upload your ID photo or scanned document.' },
        { step: 'Step 2: Target size', text: 'The 100KB target is preconfigured. Adjust to 200KB or 300KB if desired.' },
        { step: 'Step 3: Download', text: 'Save your file with guaranteed compliance under 100KB.' },
      ],
    },
    faq: {
      ru: [
        { q: 'Почему Госуслуги требуют фото до 100-300 КБ?', a: 'Государственные базы данных хранят миллионы профилей и оптимизируют дисковое пространство. Наш сервис помогает соблюсти эти ограничения за 3 секунды.' },
        { q: 'Что если исходное фото очень большое (10 МБ)?', a: 'Наш алгоритм сначала плавно снижает качество, а если этого недостаточно, пропорционально уменьшает разрешение, чтобы уложиться в 100 КБ.' },
      ],
      en: [
        { q: 'Why do application portals require images under 100KB?', a: 'To conserve database storage and ensure fast transmission. Our engine adapts compression parameters automatically.' },
        { q: 'What if the original photo is very large (e.g. 10MB)?', a: 'The engine adjusts compression quality and scales resolution smoothly until it falls right under 100KB.' },
      ],
    },
    relatedTools: ['szhat-jpeg', 'izmenit-razmer-foto', 'szhat-png'],
    relatedDocSlugs: ['kak-szhat-foto-do-100-kb', 'konfidencialnost-klient-szhatie'],
  },
  {
    slug: {
      ru: 'izmenit-razmer-foto',
      en: 'resize-image',
    },
    title: {
      ru: 'Изменить размер фото',
      en: 'Resize Image Online',
    },
    metaTitle: {
      ru: 'Изменить размер фото в пикселях онлайн бесплатно — СжатьФото',
      en: 'Resize Image Dimensions Online Free - Width & Height | CompressPhoto',
    },
    metaDescription: {
      ru: 'Измените разрешение и геометрический размер фото в пикселях с сохранением пропорций. Быстрый ресайз картинок прямо в браузере.',
      en: 'Change image resolution and pixel dimensions while keeping aspect ratio. Instant client-side photo resizer.',
    },
    h1: {
      ru: 'Изменить размер фото в пикселях онлайн',
      en: 'Resize Image Dimensions Online',
    },
    subtitle: {
      ru: 'Масштабируйте фотографии под любые нужные размеры (1920x1080, 800x600, аватары) с сохранением пропорций.',
      en: 'Scale photos to any required dimensions (1920x1080, 800x600, avatars) with automatic aspect ratio lock.',
    },
    defaultSettings: {
      format: 'original',
      quality: 85,
      maxWidth: 1920,
      maxHeight: 1080,
      stripMetadata: true,
    },
    features: {
      ru: [
        { title: 'Сохранение пропорций', desc: 'Автоматический пересчет высоты при изменении ширины без искажения геометрии.' },
        { title: 'Высокоточная интерполяция', desc: 'Сглаживание контуров исключает появление пиксельных ступенек («лесенок»).' },
        { title: 'Пакетный ресайз', desc: 'Приведите тысячи картинок к единому максимальному разрешению за один клик.' },
      ],
      en: [
        { title: 'Aspect Ratio Locked', desc: 'Automatically recalculates height to match desired width without stretching.' },
        { title: 'Smooth Interpolation', desc: 'High-quality bicubic resampling prevents pixelation and jagged edges.' },
        { title: 'Batch Resizing', desc: 'Fit multiple photos into uniform maximum dimensions in a single step.' },
      ],
    },
    howToSteps: {
      ru: [
        { step: 'Шаг 1: Загрузите изображение', text: 'Добавьте фото в окно компрессора.' },
        { step: 'Шаг 2: Укажите ширину или высоту', text: 'Задайте максимальное значение в пикселях.' },
        { step: 'Шаг 3: Сохраните результат', text: 'Скачайте уменьшенное фото.' },
      ],
      en: [
        { step: 'Step 1: Upload image', text: 'Add photos to the workspace.' },
        { step: 'Step 2: Specify width or height', text: 'Enter max pixel dimension constraints.' },
        { step: 'Step 3: Save result', text: 'Download your resized images.' },
      ],
    },
    faq: {
      ru: [
        { q: 'Исказится ли фото при изменении размера?', a: 'Нет, пропорции сторон блокируются автоматически, предотвращая сплющивание или растягивание.' },
      ],
      en: [
        { q: 'Will the photo look distorted or stretched?', a: 'No, our resizer locks aspect ratios to ensure natural geometry.' },
      ],
    },
    relatedTools: ['szhat-foto-do-100-kb', 'szhat-jpeg', 'szhat-webp'],
    relatedDocSlugs: ['kak-szhat-foto-do-100-kb', 'optimizaciya-kartinok-dlya-sayta'],
  },
];

export function getToolBySlug(slug: string, locale: 'ru' | 'en'): ToolLandingData | undefined {
  return TOOLS_DATA.find((tool) => tool.slug[locale] === slug || tool.slug.ru === slug || tool.slug.en === slug);
}
