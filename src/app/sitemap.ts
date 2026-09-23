import type { MetadataRoute } from 'next';
import { SITE_URL, hirek, galeria, aktualisHirek, PAGE_SIZE } from '@/lib/util';
import { nav } from '@/data/nav';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = new Set<string>(['/', '/hirek/', '/archivum/', '/galeria/', '/elerhetosegeink/', '/dokumentumok/', '/fizika/', '/osztalyaink/']);
  nav.forEach((n) => { staticPaths.add(n.href); n.children?.forEach((c) => staticPaths.add(c.href)); });
  const entries: MetadataRoute.Sitemap = [...staticPaths].map((p) => ({
    url: `${SITE_URL}${p}`, lastModified: now, changeFrequency: p === '/' || p === '/hirek/' ? 'weekly' : 'monthly', priority: p === '/' ? 1 : 0.7,
  }));
  const pages = Math.ceil(aktualisHirek.length / PAGE_SIZE);
  for (let i = 2; i <= pages; i++) entries.push({ url: `${SITE_URL}/hirek/oldal/${i}/`, lastModified: now, changeFrequency: 'weekly', priority: 0.4 });
  hirek.forEach((h) => entries.push({ url: `${SITE_URL}/hirek/${h.slug}/`, lastModified: h.date ? new Date(h.date) : now, changeFrequency: 'yearly', priority: h.category === 'archivum' ? 0.3 : 0.6 }));
  galeria.forEach((g) => entries.push({ url: `${SITE_URL}/galeria/${g.slug}/`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 }));
  return entries;
}
