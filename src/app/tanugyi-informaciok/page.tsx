import type { Metadata } from 'next';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import { iskola } from '@/data/iskola';

export const metadata: Metadata = {
  title: 'Tanügyi információk',
  description: 'Fenntartói, működtetői adatok és hivatalos azonosítók.',
  alternates: { canonical: '/tanugyi-informaciok/' },
};

export default function Page() {
  return (
    <PageLayout title="Tanügyi információk" section="informaciok" path="/tanugyi-informaciok/" lead="Fenntartói, működtetői adatok és hivatalos azonosítók.">
      <div className="grid grid-2">
        <div className="card info-box">
          <span className="eyebrow">Fenntartó és működtető</span>
          <strong>{iskola.fenntarto.nev}</strong>
          <div>{iskola.fenntarto.cim}</div>
          <div className="muted">({iskola.fenntarto.tol})</div>
        </div>
        <div className="card info-box">
          <span className="eyebrow">Intézmény</span>
          <strong>{iskola.nev}</strong>
          <div>{iskola.cim}</div>
          <div className="muted">OM azonosító: {iskola.om}</div>
        </div>
      </div>
      <div className="notice"><p>A beiskolázási körzetről a <Link href="/korzeti-altalanos-iskola/">Körzeti általános iskola</Link>, az iskola alapdokumentumairól a <Link href="/dokumentumok/">Dokumentumok</Link> oldalon tájékozódhat.</p></div>
    </PageLayout>
  );
}
