import { MetadataRoute } from 'next';
import { TOOLS_DATA } from '@/lib/tools-data';
import { DOCS_DATA } from '@/lib/docs-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://compress-photo.online';
  const currentDate = new Date().toISOString();

  const entries: MetadataRoute.Sitemap = [
    // Homepages
    {
      url: `${baseUrl}/ru`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },

    // Docs indexes
    {
      url: `${baseUrl}/ru/docs`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/docs`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Tool landing pages
  for (const tool of TOOLS_DATA) {
    entries.push({
      url: `${baseUrl}/ru/${tool.slug.ru}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    });
    entries.push({
      url: `${baseUrl}/en/${tool.slug.en}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    });
  }

  // Documentation guides
  for (const doc of DOCS_DATA) {
    entries.push({
      url: `${baseUrl}/ru/docs/${doc.slug}`,
      lastModified: doc.dateModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    });
    entries.push({
      url: `${baseUrl}/en/docs/${doc.slug}`,
      lastModified: doc.dateModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    });
  }

  return entries;
}
