import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import NewsList from '@/components/NewsList';
import NewsBrowser, { type NewsMeta } from '@/components/NewsBrowser';
import { hirek, aktualisHirek, PAGE_SIZE } from '@/lib/util';

export const metadata: Metadata = {
  title: 'Hírek',
  description: 'A Zsirai Általános Iskola aktuális hírei, eseményei, versenyeredményei – kereshető, tanév és kategória szerint szűrhető.',
  alternates: { canonical: '/hirek/' },
};

export default function HirekPage() {
  const total = Math.ceil(aktualisHirek.length / PAGE_SIZE);
  const meta: NewsMeta[] = hirek.map((h) => ({ slug: h.slug, title: h.title, date: h.date, category: h.category, cover: h.coverThumb ?? h.cover, excerpt: h.excerpt }));
  return (
    <>
      <PageHero title="Hírek, események" path="/hirek/" lead={`Az iskola életének krónikája: versenyek, kirándulások, ünnepek és tudnivalók. Összesen ${aktualisHirek.length} bejegyzés.`}>
        <div className="chip-row" style={{ marginTop: '1.25rem' }}><Link className="chip" href="/archivum/">Régebbi bejegyzések az Archívumban →</Link></div>
      </PageHero>
      <div className="container page-body">
        <NewsBrowser items={meta} />
        <NewsList items={aktualisHirek.slice(0, PAGE_SIZE)} page={1} total={total} base="/hirek/" />
      </div>
    </>
  );
}
