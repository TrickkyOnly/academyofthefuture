import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://центр-будущего.рф';
  const routes = ['', '/programs', '/specialists', '/reviews', '/blog', '/contacts'].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.7
  }));

  return routes;
}
