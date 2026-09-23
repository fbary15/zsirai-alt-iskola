import hirekRaw from '@/data/hirek.json';
import galeriaRaw from '@/data/galeria.json';
import pagesRaw from '@/data/pages.json';

export type Hir = {
  id: number; slug: string; title: string; date: string | null;
  category: 'info' | 'aktualis' | 'archivum'; featured: boolean;
  cover: string | null; coverThumb: string | null; excerpt: string; html: string;
};
export type AlbumImage = { src: string; thumb: string; alt: string; w: number; h: number };
export type Album = { slug: string; title: string; year: number | null; cover: string | null; images: AlbumImage[] };

export const hirek = hirekRaw as Hir[];
export const aktualisHirek = hirek.filter((h) => h.category !== 'archivum');
export const archivHirek = hirek.filter((h) => h.category === 'archivum');
export const galeria = galeriaRaw as Album[];
export const pages = pagesRaw as Record<string, { title: string; html: string }>;

export const SITE_URL = 'https://www.iskola.zsira.hu';
export const PAGE_SIZE = 12;

const HONAPOK = ['január', 'február', 'március', 'április', 'május', 'június', 'július', 'augusztus', 'szeptember', 'október', 'november', 'december'];

export function formatDate(iso: string | null, opts: { short?: boolean } = {}): string {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  if (opts.short) return `${y}. ${String(m).padStart(2, '0')}. ${String(d).padStart(2, '0')}.`;
  return `${y}. ${HONAPOK[m - 1]} ${d}.`;
}

export function tanev(iso: string | null): string {
  if (!iso) return '';
  const [y, m] = iso.split('-').map(Number);
  const start = m >= 8 ? y : y - 1;
  return `${start}/${start + 1}`;
}

export function categoryLabel(c: Hir['category']): string {
  return c === 'info' ? 'Információ' : c === 'aktualis' ? 'Aktuális' : 'Archívum';
}

export function abs(path: string): string {
  return new URL(path, SITE_URL).toString();
}
