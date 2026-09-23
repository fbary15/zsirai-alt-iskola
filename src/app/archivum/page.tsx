import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { archivHirek, formatDate, tanev, type Hir } from '@/lib/util';

export const metadata: Metadata = {
  title: 'Archívum',
  description: 'A Zsirai Általános Iskola korábbi híreinek, beszámolóinak archívuma.',
  alternates: { canonical: '/archivum/' },
};

export default function ArchivumPage() {
  const groups = new Map<string, Hir[]>();
  for (const h of archivHirek) {
    const k = tanev(h.date) || 'Ismeretlen';
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k)!.push(h);
  }
  return (
    <>
      <PageHero title="Archívum" path="/archivum/" lead={`Korábbi tanévek bejegyzései, tanévkezdési tájékoztatói és beszámolói. ${archivHirek.length} archivált bejegyzés.`} />
      <div className="container page-body arch-wrap">
        {[...groups.entries()].map(([ev, items]) => (
          <section key={ev} className="arch-year">
            <h2>{ev}. tanév</h2>
            <ul className="list-clean stack">
              {items.map((h) => (
                <li key={h.slug} className="card arch-row">
                  <time dateTime={h.date ?? undefined}>{formatDate(h.date, { short: true })}</time>
                  <Link href={`/hirek/${h.slug}/`}>{h.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <p className="center" style={{ marginTop: '2.5rem' }}><Link className="btn btn-outline" href="/hirek/">Aktuális hírek</Link></p>
      </div>
    </>
  );
}
