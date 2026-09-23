import type { Metadata } from 'next';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import { iskola } from '@/data/iskola';

export const metadata: Metadata = {
  title: 'Körzeti általános iskola',
  description: 'A Zsirai Általános Iskola beiskolázási körzete: Zsira, Gyalóka, Répcevis, Szakony.',
  alternates: { canonical: '/korzeti-altalanos-iskola/' },
};

export default function Page() {
  return (
    <PageLayout title="Körzeti általános iskola" section="informaciok" path="/korzeti-altalanos-iskola/" lead="A Zsirai Általános Iskola beiskolázási körzete.">
      <div className="card korzet-box">
        <span className="eyebrow">Körzeti általános iskola</span>
        <strong>{iskola.nev.toUpperCase()}</strong>
        <div>{iskola.cim}</div>
        <p style={{ margin: '1rem 0 .5rem' }}>beiskolázási körzete az alábbi települések közigazgatási területe:</p>
        <div className="chip-row">{iskola.korzet.map((t) => <span key={t} className="chip">{t}</span>)}</div>
      </div>
      <div className="notice"><p>Beiratkozással kapcsolatos aktuális tudnivalók a <Link href="/tanev-rendje/">tanév rendje</Link> oldalon és a <Link href="/hirek/">hírek</Link> között találhatók.</p></div>
    </PageLayout>
  );
}
